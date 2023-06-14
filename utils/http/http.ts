import { env } from '../env'

const BASE_URL = env.baseURL

export interface Params {
  [key: string]: string | number
}

async function request<T>(_url: string, _config: RequestInit & { query?: Params; data?: Params }) {
  const url = formatURL(_url, _config.query)
  const config = formatConfig(_config)
  const response = await fetch(url, config)
  const result = await response.json()
  return result as T
}

function formatURL(_url: string, query?: Params) {
  let url = _url
  if (query) {
    url = formatQueryURL(_url, query)
  }
  if (url.startsWith('http')) {
    return url
  } else {
    return BASE_URL + url
  }
}
function formatQueryURL(_url: string, _query: Params) {
  const [url, queryStr] = _url.split('?')
  const query = Object.assign({}, _query)
  if (queryStr) {
    const baseQuery = Object.fromEntries(queryStr.split('&').map((x) => x.split('=')))
    Object.assign(query, baseQuery)
  }
  const targetQueryStr = Object.entries(query)
    .filter((x) => x[1] !== undefined)
    .map((x) => `${x[0]}=${x[1]}`)
    .join('&')
  return url + '?=' + targetQueryStr
}

function formatConfig(_config: RequestInit & { query?: Params; data?: Params }): RequestInit {
  const config = Object.assign({}, _config, { query: undefined, data: undefined })
  if (_config.data) {
    config.headers = Object.assign(config.headers || {}, { 'Content-Type': 'application/json' })
    config.body = JSON.stringify(_config.data)
  }
  return config
}

export const http = {
  request,
}
