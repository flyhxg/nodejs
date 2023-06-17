export const isServer = undefined === typeof window
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
  explorer: 'http://3.19.120.151:8081',
}
const test: EnvParams = {
  network: 'testnet',
  mempoolAddress: 'https://mempool.space/testnet',
  mempoolHost: 'blockstream.info',
  baseURL: 'https://tests.havenmarket.xyz',
  chain: 'btc-testnet',
  explorer: 'http://3.19.120.151:8081',
}

export const env = isTest ? test : prod
