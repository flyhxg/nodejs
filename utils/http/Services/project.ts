import { getHttpService, PaginationData, PaginationParams, RequestConfig } from '../service'

export const projectService = {
  // @ts-ignore
  orderList: getHttpService<PaginationData<OrderItem>, PaginationParams & { top: number; collection_id: number }>(
    '/api/order/list'
  ),
  getCollectionDetail: (id: number, config?: RequestConfig) =>
    getHttpService<CollectionItem, {}>(`/api/collection/detail/${id}`)({}, config),
}

export interface OrderItem {
  order_id: number
  inscription_id: string
  name: string
  content_url: string
  content_type: string
  owner: string
  number: number
  block_height: number
  rarity: number
  price: number
  last_sale_price: number
  listing_time: number
  tx_hash: string
}

export interface CollectionItem {
  id: number
  name: string
  logo: string
  description: string
  holders: number
  supply: number
  total_supply: number
  web_site: string
  discord: string
  telegram: string
  twitter: string
  create_time: number
}