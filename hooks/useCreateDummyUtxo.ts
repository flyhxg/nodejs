import { AddressTxsUtxo } from '@mempool/mempool.js/lib/interfaces'
import * as bitcoin from 'bitcoinjs-lib'
import { network } from '../utils/constants'
import { calculateTxBytesFeeWithRate } from '../utils/BuyerSigner'
import { InvalidArgumentError, utxo } from '../lib/msigner/interfaces'
import { DUMMY_UTXO_MIN_VALUE, DUMMY_UTXO_VALUE } from '../lib/msigner/constant'
import { useCallback, useState } from 'react'
import { useWallet } from '../app/context/WalletContext'
import { isP2SHAddress, mapUtxos } from '../utils/transaction'
import { DialogType, useDialog } from '../app/context/DialogContext'
import { getErrorMsg, sleep } from '../utils'
import { mempool } from '../utils/mempool'

export default function useCreateDummyUtxos(fee: number) {
  const { account, publicKey, signPsbt, pushPsbt } = useWallet()
  const [loading, setLoading] = useState(false)
  const { openDialog } = useDialog()
  const create = useCallback(
    async (unqualifiedUtxos: AddressTxsUtxo[]) => {
      if (!account || !publicKey) return false
      try {
        setLoading(true)
        const psbtHex = await generateUnsignedCreateDummyUtxoPSBTHex(account, publicKey, unqualifiedUtxos, fee)
        const signedPsbt = await signPsbt(psbtHex)
        const tx = await pushPsbt(signedPsbt)
        let retry = 0
        try {
          while (true) {
            const rst = await isCreated(tx, account)
            if (rst) return true
            await sleep(3000)
          }
        } catch (e) {
          retry++
          if (retry === 3) return false
        }
        return true
      } catch (e) {
        console.error(e)
        openDialog(DialogType.Error, { title: 'Prepare error.', desc: getErrorMsg(e) })
        return false
      } finally {
        setLoading(false)
      }
    },
    [account, signPsbt, publicKey, fee]
  )
  return { create, loading }
}

async function isCreated(txid: string, account: string) {
  const {
    bitcoin: { addresses },
  } = mempool()
  const utxoList = await addresses.getAddressTxsUtxo({ address: account })
  const result = utxoList.some((x) => x.txid === txid)
  return result
}

export async function generateUnsignedCreateDummyUtxoPSBTHex(
  address: string,
  buyerPublicKey: string | undefined,
  unqualifiedUtxos: AddressTxsUtxo[],
  fee: number
): Promise<string> {
  const ecc = await import('tiny-secp256k1')
  bitcoin.initEccLib(ecc)
  const psbt = new bitcoin.Psbt({ network })
  const [mappedUnqualifiedUtxos]: [utxo[]] = await Promise.all([mapUtxos(unqualifiedUtxos)])
  const recommendedFee = fee
  // Loop the unqualified utxos until we have enough to create a dummy utxo
  let totalValue = 0
  let paymentUtxoCount = 0
  for (const utxo of mappedUnqualifiedUtxos) {
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
      input.redeemScript = p2sh.redeem?.output
    }
    input.witnessUtxo = utxo.tx.outs[utxo.vout]
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
