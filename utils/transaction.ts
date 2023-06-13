import { mempool } from './mempool'
import { sleep } from './index'
import * as bitcoin from 'bitcoinjs-lib'
import { AddressTxsUtxo } from '@mempool/mempool.js/lib/interfaces'
import { utxo } from '../lib/msigner/interfaces'

export async function queryTxStatus(txid: string) {
  const {
    bitcoin: { transactions },
  } = mempool()
  const tx = await transactions.getTx({ txid })
  return tx.status
}

export async function waitTxConfirmed(txid: string) {
  while (true) {
    const status = await queryTxStatus(txid)
    if (status) return true
    await sleep(300000)
  }
}

export function isP2SHAddress(address: string, network: bitcoin.Network): boolean {
  try {
    const { version, hash } = bitcoin.address.fromBase58Check(address)
    return version === network.scriptHash && hash.length === 20
  } catch (error) {
    return false
  }
}

export async function mapUtxos(utxosFromMempool: AddressTxsUtxo[]): Promise<utxo[]> {
  const ret: utxo[] = []
  const {
    bitcoin: { transactions },
  } = mempool()
  for (const utxoFromMempool of utxosFromMempool) {
    ret.push({
      txid: utxoFromMempool.txid,
      vout: utxoFromMempool.vout,
      value: utxoFromMempool.value,
      status: utxoFromMempool.status,
      tx: bitcoin.Transaction.fromHex(await transactions.getTxHex({ txid: utxoFromMempool.txid })),
    })
  }
  return ret
}

export const satToBtc = (sat: number) => sat / 100000000

// async function getrawtransactionVerbose(txid: string): Promise<IGetRawTransactionVerboseResult> {
//   const {
//     bitcoin: { transactions },
//   } = mempool()
//   const txRaw = await transactions.getTxHex({ txid })
//   const res = Transaction.fromHex(txRaw)
//   return res
// }

export const toXOnly = (pubKey: Buffer) => (pubKey.length === 32 ? pubKey : pubKey.subarray(1, 33))
