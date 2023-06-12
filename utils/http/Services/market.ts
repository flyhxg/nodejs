import { postHttpService } from '../service'

export const marketService = {
  listOrder: postHttpService<
    string,
    {
      chain: string
      inscriptionId: string
      location: string
      locationBlockHeight: number
      output: string
      outputValue: number
      contentURI: string
      contentType: string
      price: number
      makerFeeBp: number
      address: string
      signedListingPSBT: string
    }
  >('/api/order'),
  mergeOrder: postHttpService<
    string,
    {
      chain: string
      inscriptionId: string
      output: string
      signedBuyerPSBT: string
    }
  >('/api/order/merge'),
}
