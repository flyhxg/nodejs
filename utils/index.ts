export const NoOperation = () => {}

export function shortenAddress(address?: string | null) {
  if (!address) return ''
  return address.slice(0, 5) + '...' + address.slice(-5)
}

export function sleep(time: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}
