import { http, Params } from './http'
import { Service } from 'ahooks/es/useRequest/src/types'
import { ServerCode } from './serverCode'

export interface ResponseType<T> {
  code: number
  message: string
  data: T
}

export type HttpError = ResponseType<string>

export interface PaginationData<T> {
  page: number
  limit: number
  items: T[]
  total: number
}

export interface PaginationEventData<T> {
  page_no: number
  page_size: number
  items: T[]
  total: number
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface ServiceError {
  code: ServerCode
  message: string
  data: string
}

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'

type MethodWithBody = 'post' | 'POST' | 'put' | 'PUT'

interface RequestConfig {
  next?: NextFetchRequestConfig
  cache?: RequestCache
}

function httpService<R, D extends Params, Q extends Params>(method: MethodWithBody, url: string) {
  return function (data: D, query?: Q) {
    return http
      .request<ResponseType<R>>(url, {
        method,
        data,
        query,
      })
      .then((res) => {
        if (res.code === 0 || res.code === 200) {
          return res.data
        } else {
          throw new Error(res.message)
        }
      })
  } as Service<R, [D, Q] | [D]>
}

function httpServiceNoBody<R, Q extends Params>(method: Exclude<Method, MethodWithBody>, url: string) {
  return function (query?: Q, config?: RequestConfig) {
    return http
      .request<ResponseType<R>>(url, {
        method,
        query,
        ...config,
      })
      .then((res) => {
        if (res.code === 0 || res.code === 200) {
          return res.data
        } else {
          throw new Error(res.message)
        }
      })
  } as Service<R, [Q, RequestConfig] | [Q] | []>
}

export function getHttpService<R, Q extends Params = {}>(url: string) {
  return httpServiceNoBody<R, Q>('get', url)
}

export function postHttpService<R, D extends Params, Q extends Params = {}>(url: string) {
  return httpService<R, D, Q>('post', url)
}

export function putHttpService<R, D extends Params, Q extends Params = {}>(url: string) {
  return httpService<R, D, Q>('put', url)
}
