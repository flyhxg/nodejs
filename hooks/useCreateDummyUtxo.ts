import { AddressTxsUtxo } from '@mempool/mempool.js/lib/interfaces'
import * as bitcoin from 'bitcoinjs-lib'
import { network } from '../utils/constants'
import { calculateTxBytesFeeWithRate, getFees, isP2SHAddress, mapUtxos } from '../utils/BuyerSigner'
import { InvalidArgumentError, utxo } from '../lib/msigner/interfaces'
import { DUMMY_UTXO_MIN_VALUE, DUMMY_UTXO_VALUE } from '../lib/msigner/constant'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from '../app/context/WalletContext'

export default function useCreateDummyUtxos() {
  const { account, publicKey, signPsbt, pushPsbt } = useWallet()
  const createDummyUtxos = useCallback(
    async (unqualifiedUtxos: AddressTxsUtxo[]) => {
      if (!account || !publicKey) return
      const psbtHex = await generateUnsignedCreateDummyUtxoPSBTHex(account, publicKey, unqualifiedUtxos, 'fastestFee')
      const signedPsbt = await signPsbt(psbtHex)
      const tx = pushPsbt(signedPsbt)
    },
    [account, signPsbt]
  )
  return createDummyUtxos
}

export async function generateUnsignedCreateDummyUtxoPSBTHex(
  address: string,
  buyerPublicKey: string | undefined,
  unqualifiedUtxos: AddressTxsUtxo[],
  feeRateTier: string
): Promise<string> {
  const psbt = new bitcoin.Psbt({ network })
  const [mappedUnqualifiedUtxos, recommendedFee]: [utxo[], number] = await Promise.all([
    mapUtxos(unqualifiedUtxos),
    getFees(feeRateTier),
  ])

  // Loop the unqualified utxos until we have enough to create a dummy utxo
  let totalValue = 0
  let paymentUtxoCount = 0
  for (const utxo of mappedUnqualifiedUtxos) {
    // if (await doesUtxoContainInscription(utxo, itemProvider)) {
    //   continue;
    // }

    const input: any = {
      hash: utxo.txid,
      index: utxo.vout,
      nonWitnessUtxo: utxo.tx.toBuffer(),
    }

    if (isP2SHAddress(address, network)) {
      const redeemScript = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(buyerPublicKey!, 'hex'),
      }).output
      const p2sh = bitcoin.payments.p2sh({
        redeem: { output: redeemScript },
      })
      input.witnessUtxo = utxo.tx.outs[utxo.vout]
      input.redeemScript = p2sh.redeem?.output
    }

    psbt.addInput(input)
    totalValue += utxo.value
    paymentUtxoCount += 1

    const fees = calculateTxBytesFeeWithRate(
      paymentUtxoCount,
      2, // 2-dummy outputs
      recommendedFee
    )
    if (totalValue >= DUMMY_UTXO_VALUE * 2 + fees) {
      break
    }
  }

  const finalFees = calculateTxBytesFeeWithRate(
    paymentUtxoCount,
    2, // 2-dummy outputs
    recommendedFee
  )

  const changeValue = totalValue - DUMMY_UTXO_VALUE * 2 - finalFees

  // We must have enough value to create a dummy utxo and pay for tx fees
  if (changeValue < 0) {
    throw new InvalidArgumentError(`You might have pending transactions or not enough fund`)
  }

  psbt.addOutput({
    address,
    value: DUMMY_UTXO_VALUE,
  })
  psbt.addOutput({
    address,
    value: DUMMY_UTXO_VALUE,
  })

  // to avoid dust
  if (changeValue > DUMMY_UTXO_MIN_VALUE) {
    psbt.addOutput({
      address,
      value: changeValue,
    })
  }

  return psbt.toHex()
}
