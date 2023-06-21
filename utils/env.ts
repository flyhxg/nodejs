export const isServer = 'undefined' === typeof window
export const isBrowser = !isServer
export const isTest = process.env.NEXT_PUBLIC_ENV === 'test'

interface EnvParams {
  network: 'testnet' | 'livenet'
  chain: 'btc-testnet' | 'btc-livenet'
  mempoolHost: string
  mempoolAddress: string
  baseURL: string
  explorer: string
}

const prod: EnvParams = {
  network: 'livenet',
  mempoolAddress: 'https://mempool.space',
  mempoolHost: 'mempool.space',
  baseURL: 'https://tests.havenmarket.xyz',
  chain: 'btc-livenet',
  explorer: 'https://ordinals.com',
}
const test: EnvParams = {
  network: 'testnet',
  mempoolAddress: 'https://mempool.space/testnet',
  mempoolHost: 'mempool.space',
  // mempoolHost: 'blockstream.info',
  baseURL: 'https://tests.havenmarket.xyz',
  chain: 'btc-testnet',
  explorer: 'http://3.19.120.151:8081',
}

export const env = isTest ? test : prod
export const PLATFORM_FEE_ADDRESS = isTest
  ? 'tb1qf05d2yqlumhr6gk023wne2956ujcrlmw7mnzdn'
  : 'bc1p7h8ylrulx4ezsuyy2wpp6mwxppgzh6230y6q4xq056hgjawjl0eq7c65kc'
