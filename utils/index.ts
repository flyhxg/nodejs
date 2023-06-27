import { env } from './env'
import BigNumber from 'bignumber.js'
import { makerFeeBp, minFee, takerFeeBp } from './constants'

export const NoOperation = () => {}

export function shortenAddress(address?: string | null) {
  if (!address) return ''
  return address.slice(0, 5) + '...' + address.slice(-5)
}

export function sleep(time: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}

export function getErrorMsg(e: any) {
  return e.reason || e.data?.message || e.message
}

export function getInscriptionImage(txId: string) {
  return `https://ordinals.com/content/${txId}`
}

export function getContentUrl(id: string) {
  return `${env.explorer}/content/${id}`
}
export function getPreviewUrl(id: string) {
  return `${env.explorer}/preview/${id}`
}

const ONE_BTC = new BigNumber('100000000')
export function formatSat(num: number) {
  const bigNum = new BigNumber(Math.floor(num)).div(ONE_BTC)
  return +bigNum.toFormat(9)
}

export function parseSat(_amount: number | string) {
  if (isNaN(+_amount)) return 0
  return ONE_BTC.times(+_amount).toNumber()
}

export function getImageUri(_url: string, _size?: number) {
  const size = _size || 256
  const url = `https://bananas.market/v1/img-compress?uri=${_url}&w=${size}&h=${size}`
  return url
}

export function isNeedFee(price: number) {
  return (price * (makerFeeBp + takerFeeBp)) / 10000 > minFee
}

export function shortenHash(txHash: string, shorten = 10) {
  return txHash?.length > 20 ? txHash.slice(0, shorten) + '...' + txHash.slice(-shorten) : txHash
}
