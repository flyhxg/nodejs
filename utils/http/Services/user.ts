import { getHttpService, PaginationData, PaginationParams } from '../service'

export const userService = {
  // @ts-ignore
  myNftList: getHttpService<PaginationData<NFTItem>, PaginationParams & { currAddr: string }>('/api/user/asset/info'),
}

export interface NFTItem {
  id: string
  name: string
  content_type: string
  content_length: number
  content_uri: string
  number: number
  listed: boolean
  order_status: number
  collection_name: string
}
