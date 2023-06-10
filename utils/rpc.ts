import axios, { CreateAxiosDefaults } from 'axios'
import * as bitcoin from 'bitcoinjs-lib'

const rpc = axios.create({
  baseURL: 'https://mempool.space/testnet',
} as CreateAxiosDefaults)

export const RPC = {
  async getTransaction(txid: string) {
    return await axios
      .get('/api/tx/15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521/raw', {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        return bitcoin.Transaction.fromBuffer(Buffer.from(res.data))
      })
  },
  async getAddressUtxo(address: string) {},
}
