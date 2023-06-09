import { useCallback } from 'react'
import { useWallet } from '../app/context/WalletContext'
import { IListingState, IOrdItem, SellerSigner } from '../lib/msigner'

export default function useCreateListingPSBT() {
  const { account } = useWallet()
  const create = useCallback(
    async (price: number) => {
      if (!account) return
      const item: IOrdItem = {
        id: '83eb8b29c11905f7d94de94cdfd56acde13a82e2da9b393b81435fa855ee7129i0',
        contentType: 'application/json',
        contentURI:
          'http://18.222.82.179:8081/content/83eb8b29c11905f7d94de94cdfd56acde13a82e2da9b393b81435fa855ee7129i0',
        contentPreviewURI:
          'http://18.222.82.179:8081/preview/83eb8b29c11905f7d94de94cdfd56acde13a82e2da9b393b81435fa855ee7129i0',
        sat: -1,
        genesisTransaction: '83eb8b29c11905f7d94de94cdfd56acde13a82e2da9b393b81435fa855ee7129',
        genesisTransactionBlockTime: '2023-06-01 10:56:35 UTC',
        inscriptionNumber: 0,
        chain: 'btc-regtest',
        location: '53c99793f704783ecb5c28ef56f6e53995c98341c99e4f4e48b3a4df55bd73c7:0:0',
        output: '53c99793f704783ecb5c28ef56f6e53995c98341c99e4f4e48b3a4df55bd73c7:0',
        outputValue: 9556, // 铭文占据sat的值，对应为0.00009556 BTC
        owner: 'bcrt1pjlxppknmqkqt0lc2fnne6a85nh3jac7rmwtn3glzsn5cxpta3rdskququd',
        listed: false,
        satName: 'satname',
      }
      const listing: IListingState = {
        seller: {
          makerFeeBp: 100,
          sellerOrdAddress: account,
          price,
          ordItem: item,
          sellerReceiveAddress: account,
          tapInternalKey: '',
        },
      }
      console.log('before', listing)
      const base64 = await SellerSigner.generateUnsignedListingPSBTBase64(listing)
      console.log('after', base64)
    },
    [account]
  )
  return create
}
