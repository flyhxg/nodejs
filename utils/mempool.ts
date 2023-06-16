import { MempoolReturn } from '@mempool/mempool.js/lib/interfaces/index'
import { env } from './env'
import * as bitcoin from 'bitcoinjs-lib'
import { Transaction } from 'bitcoinjs-lib'

let _mempool: MempoolReturn | null = null

export function mempool() {
  if (_mempool) return _mempool as MempoolReturn
  _mempool = window.mempoolJS({
    hostname: env.mempoolHost,
    network: env.network,
  })
  return _mempool as MempoolReturn
}

const _cache: {
  [key: string]: string | Promise<string>
} = {}
export async function getTxHex(txId: string): Promise<string> {
  if (_cache[txId]) return Promise.resolve(_cache[txId])
  else {
    const {
      bitcoin: { transactions },
    } = mempool()

    _cache[txId] = transactions
      .getTxHex({ txid: txId })
      .then((res) => {
        return res
      })
      .catch((e) => {
        _cache[txId] = ''
        throw e
      })
    return _cache[txId]
  }
}

export async function getTransaction(txId: string): Promise<Transaction> {
  const txHex = await getTxHex(txId)

  return bitcoin.Transaction.fromHex(txHex)
}
