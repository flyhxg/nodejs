import { getHttpService, postHttpService, RequestConfig } from '../service'
import { IOrdItem } from '../../../lib/msigner/interfaces'
import { env } from '../../env'
import { getContentUrl, getPreviewUrl } from '../../index'
import { OrderStatus } from '../../type'

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
  cancelOrder: postHttpService<{}, { address: string; inscriptionId: string; chain: string; signMessage: string }>(
    '/api/order/cancel'
  ),

  getOrdItem: (id: string, config?: RequestConfig) =>
    getHttpService<OrdServerItem, {}>('/api/inscription/info/' + id)({}, config).then((res) => {
      const ordItem: IOrdItem = {
        id: res.id,
        contentType: res.content_type,
        contentURI: getContentUrl(id),
        contentPreviewURI: getPreviewUrl(id),
        sat: res.sat,
        genesisTransaction: res.genesis_transaction,
        genesisTransactionBlockTime: res.genesis_transaction_block_time,
        inscriptionNumber: res.inscription_number,
        chain: env.chain,
        location: res.location,
        output: res.output,
        outputValue: +res.output_value,
        owner: res.owner,
        listed: res.listed,
        satName: res.sat_name,
        locationBlockHeight: res.location_block_height,
      }
      return ordItem
    }),
  orderDetail: getHttpService<OrderDetail, { inscription_id: string; buyer_address: string }>(`/api/order/detail`),
  isInscriptionExist: getHttpService<boolean, { tx_id: string; vout: number }>('/api/inscription/exist'),
}

export interface OrderDetail {
  collection_id: number
  collection_name: string
  name: string
  content_type: string
  content_uri: string
  inscription_id: string
  inscription_number: number
  owner: string
  genesis_tx: string
  listing_tx: string
  sat_rarity: number
  sat_number: number
  sat_name: string
  price: number
  taker_fee: number
  attributes: { trait_type: string; value: string; status: string; percent: string }[] | null
  status: OrderStatus
  padding_tx_hash: string
}

interface OrdServerItem {
  id: string
  content_type: string
  sat: number
  genesis_transaction: string
  genesis_transaction_block_time: string
  inscription_number: number
  location: string
  output: string
  output_value: number
  owner: string
  listed: boolean
  sat_name: string
  location_block_height: number
}
