import { getHttpService, PaginationData, PaginationParams, postHttpService, RequestConfig } from '../service'
import { OrderStatus } from '../../type'

export const launchpadService = {
  // @ts-ignore
  getLaunchpadList: getHttpService<PaginationData<LaunchpadItem>, { pageNo: number; pageSize: number }>(
    '/api/launchpad/list'
  ),
  launchpadDetail: (id: number, config?: RequestConfig) =>
    getHttpService<LaunchpadItem, {}>(`/api/launchpad/${id}`)({}, config),
  getLaunchpadStatus: (props: { lanchpadId: number; address: string }, config: RequestConfig) =>
    getHttpService<
      {
        hasWhiteList: boolean
        whiteListValid: boolean
        publicValid: boolean
        privatePendings: PendingItem[] | null
        publicPendings: PendingItem[] | null
      },
      {}
    >(`/api/launchpad/${props.lanchpadId}/status/${props.address}`)({}, config),
  getRandomLaunchpadItem: (launchpadId: number, config?: RequestConfig) =>
    getHttpService<RandomLaunchpadItem, {}>(`/api/launchpad/${launchpadId}/item`)({}, config),
  buyLaunchpad: (
    props: {
      launchpadId: number
      inscriptionId: string
      signedBuyerPSBT: string
      isPrivate: boolean
      buyerAddress: string
    },
    config?: RequestConfig
  ) =>
    postHttpService<
      string,
      { inscriptionId: string; signedBuyerPSBT: string; isPrivate: boolean; buyerAddress: string }
    >(`/api/launchpad/${props.launchpadId}/buy`)({
      inscriptionId: props.inscriptionId,
      signedBuyerPSBT: props.signedBuyerPSBT,
      isPrivate: props.isPrivate,
      buyerAddress: props.buyerAddress,
    }),
}

export interface LaunchpadItem {
  id: number
  name: string
  website: string
  email: string
  telegram: string
  twitter: string
  weibo: string
  discord: string
  description: string
  logo: string
  banner: string
  totalSupply: number
  totalSold: number
  privatePrice: number
  privateStartTime: number
  privateEndTime: number
  privateLimit: number
  publicLimit: number
  isPrivateEnd: boolean
  publicPrice: number
  publicStartTime: number
  publicEndTime: number
  isPublicEnd: boolean
  whitelist_rule: string
  about: string
  status: LaunchpadStatus
}

export enum LaunchpadStatus {
  None,
  Active = 1,
  ComingSoon = 2,
}

export interface RandomLaunchpadItem {
  chain: string
  inscriptionId: string
  address: string
  location: string
  locationBlockHeight: number
  output: string
  outputValue: number
  price: number
  contentType: string
  contentURI: string
}

export interface PendingItem {
  buyerAddress: string
  inscriptionId: string
  launchpadId: number
  orderId: number
  status: OrderStatus
  txHash: string
  whiteListId: number
}
