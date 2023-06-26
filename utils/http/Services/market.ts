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
      takerFeeBp: number
      address: string
      signedListingPSBT: string
      orderType: string
    }
  >('/api/order'),
  mergeOrder: postHttpService<
    string,
    {
      chain: string
      inscriptionId: string
      output: string
      signedBuyerPSBT: string
      buyerAddress: string
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
  orderDetail: getHttpService<OrderDetail, { inscription_id: string; buyer_address?: string }>(`/api/order/detail`),
  isInscriptionExist: getHttpService<boolean, { tx_id: string; vout: number }>('/api/inscription/exist'),
  getInscriptionInfo: (id: string, config?: RequestConfig) =>
    fetch(`https://api.hiro.so/ordinals/v1/inscriptions/${id}`, config).then((res) =>
      res.json()
    ) as Promise<InscriptionItem>,
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
  maker_fee: number
  attributes: { trait_type: string; value: string; status: string; percent: string }[] | null
  status: OrderStatus
  padding_tx_hash: string
}

interface OrdServerItem {
  id: string
  content_type: string
  content_uri: string
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

export interface InscriptionItem {
  id: string
  number: number
  address: string
  genesis_address: string
  genesis_block_height: number
  genesis_block_hash: string
  genesis_tx_id: string
  genesis_fee: string
  genesis_timestamp: number
  tx_id: string
  location: string
  output: string
  value: string
  offset: string
  sat_ordinal: string
  sat_rarity: string
  sat_coinbase_height: number
  mime_type: string
  content_type: string
  content_length: number
  timestamp: number
}
