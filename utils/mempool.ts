import { MempoolReturn } from '@mempool/mempool.js/lib/interfaces/index'
import { env } from './env'

let _mempool: MempoolReturn | null = null

export function mempool() {
  if (_mempool) return _mempool as MempoolReturn
  _mempool = window.mempoolJS({
    hostname: env.mempoolHost,
    network: env.network,
  })
  return _mempool as MempoolReturn
}
