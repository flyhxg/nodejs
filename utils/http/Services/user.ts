import { getHttpService } from '../service'

export const userService = {
  nftList: getHttpService<
    {},
    {
      chainId: number
      contractAddress: string
      collectionAddress: string[]
      tokenId: string
      tokenIds: string
      nftIds: string
      name: string
      title: string
      ownerAddress: string
      sortType: number
      symbol: string
      minPrice: number
      maxPrice: number
      pageNo: number
      pageSize: number
      attrRanges: [
        {
          attrType: string
          min: number
          max: number
        }
      ]
      attributes: [
        {
          traitType: string
          values: string[]
        }
      ]
    }
  >('/api/mynfts'),
}

export interface NFTItem {
  chainId: number
  contractAddress: string
  tokenId: string
  owner: string
  name: string
  ImageUrl: string
  ImageType: string
  tokenURI: string
  collectName: string
  ercType: string
  orderId: number
  amount: string
  thumb: string
  minOrderPrice: string
  lastSoldPrice: string
  bestOfferPrice: string
  lastTransferTime: number
  lastSoldTime: number
  lastOrderTime: number
  mint_time: number
  symbol: string
  decimals: number
  showDecimals: number
  paymentToken: string
}
