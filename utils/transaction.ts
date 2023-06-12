import { mempool } from './mempool'
import { sleep } from './index'

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
