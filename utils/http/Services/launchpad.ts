import { getHttpService, PaginationData, PaginationParams, RequestConfig } from '../service'

export const launchpad = {
  // @ts-ignore
  getLaunchpadList: getHttpService<PaginationData<LaunchpadItem>, PaginationParams>('/api/launch/list'),
  launchpadDetail: (id: number, config?: RequestConfig) =>
    getHttpService<LaunchpadItem, {}>(`/api/launchpad/${id}`)({}, config),
  getWhitelist: (props: { lanchpadId: number; address: string }, config: RequestConfig) =>
    getHttpService<boolean, {}>(`/api/launchpad/${props.lanchpadId}/whitelist/${props.address}`)({}),
}

interface LaunchpadItem {
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
  publicPrice: number
  publicStartTime: number
  publicEndTime: number
}
