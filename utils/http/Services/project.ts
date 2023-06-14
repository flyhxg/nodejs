import { getHttpService, PaginationData, PaginationParams } from '../service'

export const projectService = {
  // @ts-ignore
  orderList: getHttpService<PaginationData<OrderItem>, PaginationParams & { top: number; collection_id: number }>(
    '/api/order/list'
  ),
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
