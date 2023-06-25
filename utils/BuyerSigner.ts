import { AddressTxsUtxo } from '@mempool/mempool.js/lib/interfaces'
import { IListingState, InvalidArgumentError, utxo, WitnessUtxo } from '../lib/msigner/interfaces'
import {
  DUMMY_UTXO_MAX_VALUE,
  DUMMY_UTXO_MIN_VALUE,
  DUMMY_UTXO_VALUE,
  ORDINALS_POSTAGE_VALUE,
} from '../lib/msigner/constant'
import { getTxHex, mempool } from './mempool'
import * as bitcoin from 'bitcoinjs-lib'
import { Psbt } from 'bitcoinjs-lib'
import { minFee, network } from './constants'
import { getSellerOrdOutputValue } from './SellerSigner'
import { isP2SHAddress, mapUtxos, satToBtc, toXOnly } from './transaction'
import { Services } from './http/Services'
import { PLATFORM_FEE_ADDRESS } from './env'

export async function selectDummyUTXOs(utxos: AddressTxsUtxo[]): Promise<utxo[]> {
  const result: utxo[] = []
  for (const utxo of utxos) {
    //  排除包含铭文的utxo
    if (await doesUtxoContainInscription(utxo)) {
      continue
    }
    //只留下对应范围聪的utxo
    if (utxo.value >= DUMMY_UTXO_MIN_VALUE && utxo.value <= DUMMY_UTXO_MAX_VALUE) {
      result.push((await mapUtxos([utxo]))[0])
      if (result.length === 2) return result
    }
  }

  return result
}

export async function selectPaymentUTXOs(
  utxos: AddressTxsUtxo[],
  amount: number, // amount is expected total output (except tx fee)
  output: number,
  vinsLength: number,
  voutsLength: number,
  feeRateTier: string,
  takerFeeBp: number
) {
  const selectedUtxos: utxo[] = []
  let selectedAmount = 0

  // Sort descending by value, and filter out dummy utxos
  utxos = utxos.filter((x) => x.value > DUMMY_UTXO_VALUE).sort((a, b) => b.value - a.value)
  const takerFee = Math.floor((amount * takerFeeBp) / 10000)
  for (const _utxo of utxos) {
    // Never spend a utxo that contains an inscription for cardinal purposes
    if (await doesUtxoContainInscription(_utxo)) {
      continue
    }
    selectedUtxos.push((await mapUtxos([_utxo]))[0])
    selectedAmount += _utxo.value
    if (
      selectedAmount >=
      amount +
        (await calculateTxBytesFee(vinsLength + selectedUtxos.length, voutsLength, feeRateTier)) +
        takerFee +
        DUMMY_UTXO_VALUE * 2 +
        output +
        ORDINALS_POSTAGE_VALUE
    ) {
      break
    }
  }

  if (selectedAmount < amount + takerFee) {
    throw new InvalidArgumentError(`Not enough cardinal spendable funds.
Address has:  ${satToBtc(selectedAmount)} BTC
Needed:       ${satToBtc(amount)} BTC`)
  }

  return selectedUtxos
}

export async function calculateTxBytesFee(
  vinsLength: number,
  voutsLength: number,
  feeRateTier: string,
  includeChangeOutput: 0 | 1 = 1
) {
  const recommendedFeeRate = await getFees(feeRateTier)
  return calculateTxBytesFeeWithRate(vinsLength, voutsLength, recommendedFeeRate, includeChangeOutput)
}

export async function getFees(feeRateTier: string) {
  const { bitcoin } = mempool()
  const res = await bitcoin.fees.getFeesRecommended()
  switch (feeRateTier) {
    case 'fastestFee':
      return res.fastestFee
    case 'halfHourFee':
      return res.halfHourFee
    case 'hourFee':
      return res.hourFee
    case 'minimumFee':
      return res.minimumFee
    default:
      return res.hourFee
  }
}

export function calculateTxBytesFeeWithRate(
  vinsLength: number,
  voutsLength: number,
  feeRate: number,
  includeChangeOutput: 0 | 1 = 1
): number {
  const baseTxSize = 10
  const inSize = 180
  const outSize = 34

  const txSize = baseTxSize + vinsLength * inSize + voutsLength * outSize + includeChangeOutput * outSize
  const fee = txSize * feeRate
  return fee
}

async function doesUtxoContainInscription(utxo: AddressTxsUtxo): Promise<boolean> {
  return await Services.marketService.isInscriptionExist({ tx_id: utxo.txid, vout: utxo.vout })
  // If it's confirmed, we check the indexing db for that output
  // return false
  // if (utxo.status.confirmed) {
  //   try {
  //     return (await itemProvider.getTokenByOutput(`${utxo.txid}:${utxo.vout}`)) !== null
  //   } catch (err) {
  //     return true // if error, we pretend that the utxo contains an inscription for safety
  //   }
  // }
  //
  // // if it's not confirmed, we search the input script for the inscription
  // const tx = await FullnodeRPC.getrawtransactionVerbose(utxo.txid)
  // let foundInscription = false
  // for (const input of tx.vin) {
  //   if ((await FullnodeRPC.getrawtransactionVerbose(input.txid)).confirmations === 0) {
  //     return true // to error on the safer side, and treat this as possible to have a inscription
  //   }
  //   const previousOutput = `${input.txid}:${input.vout}`
  //   try {
  //     if ((await itemProvider.getTokenByOutput(previousOutput)) !== null) {
  //       foundInscription = true
  //       return foundInscription
  //     }
  //   } catch (err) {
  //     return true // if error, we pretend that the utxo contains an inscription for safety
  //   }
  // }
  //
  // return foundInscription
}

export async function generateUnsignedBuyingPSBTBase64(
  listing: IListingState,
  takerFeeBp: number,
  makerFeeBp: number
): Promise<{ listing: IListingState; psbt: Psbt }> {
  const ecc = await import('tiny-secp256k1')
  bitcoin.initEccLib(ecc)

  const psbt = new bitcoin.Psbt({ network })
  if (!listing.buyer || !listing.buyer.buyerAddress || !listing.buyer.buyerTokenReceiveAddress) {
    throw new InvalidArgumentError('Buyer address is not set')
  }

  if (listing.buyer.buyerDummyUTXOs?.length !== 2 || !listing.buyer.buyerPaymentUTXOs) {
    throw new InvalidArgumentError('Buyer address has not enough utxos')
  }

  let totalInput = 0

  // Add two dummyUtxos
  for (const dummyUtxo of listing.buyer.buyerDummyUTXOs) {
    const input: any = {
      hash: dummyUtxo.txid,
      index: dummyUtxo.vout,
      nonWitnessUtxo: dummyUtxo.tx.toBuffer(),
    }

    const p2shInputRedeemScript: any = {}
    const p2shInputWitnessUTXO: any = {}

    if (isP2SHAddress(listing.buyer.buyerAddress, network)) {
      const redeemScript = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(listing.buyer.buyerPublicKey!, 'hex'),
      }).output
      const p2sh = bitcoin.payments.p2sh({
        redeem: { output: redeemScript },
      })
      p2shInputWitnessUTXO.witnessUtxo = {
        script: p2sh.output,
        value: dummyUtxo.value,
      } as WitnessUtxo
      p2shInputRedeemScript.redeemScript = p2sh.redeem?.output
    } else {
      p2shInputWitnessUTXO.witnessUtxo = dummyUtxo.tx.outs[dummyUtxo.vout]
    }

    psbt.addInput({
      ...input,
      ...p2shInputWitnessUTXO,
      ...p2shInputRedeemScript,
    })
    totalInput += dummyUtxo.value
  }

  // Add dummy output
  psbt.addOutput({
    address: listing.buyer.buyerAddress,
    value:
      listing.buyer.buyerDummyUTXOs[0].value +
      listing.buyer.buyerDummyUTXOs[1].value +
      Number(listing.seller.ordItem.location.split(':')[2]),
  })

  const { sellerInput, sellerOutput } = await getSellerInputAndOutput(listing)

  // need to delete
  // sellerOutput.address = 'tb1qaha8rhgsq5z73nvckd53qym0t2jt4jjw3u5s55'
  // Add ordinal output
  psbt.addOutputs([
    {
      address: listing.buyer.buyerTokenReceiveAddress,
      value: ORDINALS_POSTAGE_VALUE,
    },
    sellerOutput,
  ])
  psbt.addInput(sellerInput)
  // psbt.addOutput(sellerOutput)

  // Add payment utxo inputs
  for (const utxo of listing.buyer.buyerPaymentUTXOs) {
    const input: any = {
      hash: utxo.txid,
      index: utxo.vout,
      nonWitnessUtxo: utxo.tx.toBuffer(),
    }

    const p2shInputWitnessUTXOUn: any = {}
    const p2shInputRedeemScriptUn: any = {}

    if (isP2SHAddress(listing.buyer.buyerAddress, network)) {
      const redeemScript = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(listing.buyer.buyerPublicKey!, 'hex'),
      }).output
      const p2sh = bitcoin.payments.p2sh({
        redeem: { output: redeemScript },
      })
      p2shInputWitnessUTXOUn.witnessUtxo = {
        script: p2sh.output,
        value: utxo.value,
      } as WitnessUtxo
      p2shInputRedeemScriptUn.redeemScript = p2sh.redeem?.output
    } else {
      p2shInputWitnessUTXOUn.witnessUtxo = utxo.tx.outs[utxo.vout]
    }

    psbt.addInput({
      ...input,
      ...p2shInputWitnessUTXOUn,
      ...p2shInputRedeemScriptUn,
    })

    totalInput += utxo.value
  }

  // Create a platform fee output
  let platformFeeValue = Math.floor((listing.seller.price * (takerFeeBp + makerFeeBp)) / 10000)
  platformFeeValue = platformFeeValue >= minFee ? platformFeeValue : 0

  if (platformFeeValue > 0) {
    psbt.addOutput({
      address: PLATFORM_FEE_ADDRESS,
      value: platformFeeValue,
    })
  }

  // Create two new dummy utxo output for the next purchase
  psbt.addOutput({
    address: listing.buyer.buyerAddress,
    value: DUMMY_UTXO_VALUE,
  })
  psbt.addOutput({
    address: listing.buyer.buyerAddress,
    value: DUMMY_UTXO_VALUE,
  })

  const fee = await calculateTxBytesFee(
    psbt.txInputs.length,
    psbt.txOutputs.length, // already taken care of the exchange output bytes calculation
    listing.buyer.feeRateTier
  )

  const totalOutput = psbt.txOutputs.reduce((partialSum, a) => partialSum + a.value, 0)
  const changeValue = totalInput - totalOutput - fee

  if (changeValue < 0) {
    throw `Your wallet address doesn't have enough funds to buy this inscription.
Price:            ${satToBtc(listing.seller.price)} BTC
totalInput:       ${satToBtc(totalInput)} BTC
totalOutput:      ${satToBtc(totalOutput)} BTC
fee:              ${satToBtc(fee)} BTC
platformFee:      ${satToBtc(platformFeeValue)} BTC
Required:         ${satToBtc(totalOutput + fee)} BTC
Missing:          ${satToBtc(-changeValue)} BTC`
  }

  // Change utxo
  if (changeValue > DUMMY_UTXO_MIN_VALUE) {
    psbt.addOutput({
      address: listing.buyer.buyerAddress,
      value: changeValue,
    })
  }

  listing.buyer.unsignedBuyingPSBTBase64 = psbt.toBase64()
  listing.buyer.unsignedBuyingPSBTInputSize = psbt.data.inputs.length
  return { listing, psbt }
}

async function getSellerInputAndOutput(listing: IListingState) {
  const [ordinalUtxoTxId, ordinalUtxoVout] = listing.seller.ordItem.output.split(':')
  const tx = bitcoin.Transaction.fromHex(await getTxHex(ordinalUtxoTxId))
  // No need to add this witness if the seller is using taproot
  if (!listing.seller.tapInternalKey) {
    for (let outputIndex = 0; outputIndex < tx.outs.length; outputIndex++) {
      try {
        tx.setWitness(outputIndex, [])
      } catch {}
    }
  }

  const sellerInput: any = {
    hash: ordinalUtxoTxId,
    index: parseInt(ordinalUtxoVout),
    nonWitnessUtxo: tx.toBuffer(),
    // No problem in always adding a witnessUtxo here
    witnessUtxo: tx.outs[parseInt(ordinalUtxoVout)],
  }
  // If taproot is used, we need to add the internal key
  if (listing.seller.tapInternalKey) {
    sellerInput.tapInternalKey = toXOnly(tx.toBuffer().constructor(listing.seller.tapInternalKey, 'hex'))
  }

  const ret = {
    sellerInput,
    sellerOutput: {
      address: listing.seller.sellerReceiveAddress,
      value: getSellerOrdOutputValue(
        listing.seller.price,
        listing.seller.makerFeeBp,
        listing.seller.ordItem.outputValue
      ),
    },
  }

  return ret
}
