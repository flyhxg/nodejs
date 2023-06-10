import { isServer } from './env'
import { MempoolReturn } from '@mempool/mempool.js/lib/interfaces/index'

let _mempool = null

export function mempool() {
  if (_mempool) return _mempool as MempoolReturn
  _mempool = window.mempoolJS({
    hostname: 'mempool.space',
    network: 'testnet',
  })
  return _mempool as MempoolReturn
}

// export const mempool = (
//   isServer
//     ? null
//     : window.mempoolJS({
//         hostname: 'mempool.space',
//       })
// ) as MempoolReturn
