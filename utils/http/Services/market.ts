import { WitnessUtxo } from '../../../lib/msigner'

export const marketService = {
  getNFTInfo: async (id: number) => {
    return {} as NFTItem
  },
  getUtxoList: async () => {
    // return {} as
  },
}

interface NFTItem {
  id: string
  address: string
  'output value': number
  preview: string
  content: string
  'content length': string
  'content type': string
  timestamp: string
  'genesis height': number
  'genesis fee': number
  'genesis transaction': string
  location: string
  output: string
  offset: number
}
