import { useCallback } from 'react'
import { useWallet } from '../app/context/WalletContext'
import { IListingState, IOrdItem } from '../lib/msigner'
import { generateUnsignedListingPSBTBase64 } from '../utils/SellerSigner'
import { Psbt } from 'bitcoinjs-lib'
import { testnet } from 'bitcoinjs-lib/src/networks'
import { Services } from '../utils/http/Services'
import { makerFeeBp } from '../utils/constants'

const item: IOrdItem = {
  id: 'c23c505ad81f3c472c1aec8b19db67001026c452f99960c9c34395fcdffe9c90i0',
  contentType: 'application/json',
  contentURI: 'http://3.19.120.151:8081/content/c23c505ad81f3c472c1aec8b19db67001026c452f99960c9c34395fcdffe9c90i0',
  contentPreviewURI:
    'http://3.19.120.151:8081/preview/c23c505ad81f3c472c1aec8b19db67001026c452f99960c9c34395fcdffe9c90i0',
  sat: -1,
  genesisTransaction: 'c23c505ad81f3c472c1aec8b19db67001026c452f99960c9c34395fcdffe9c90',
  genesisTransactionBlockTime: '2023-06-08 11:38:19 UTC',
  inscriptionNumber: 0,
  chain: 'btc-testnet',
  location: '6bd2340ff7caec174e7e6405d09122d0447d8f6f5ab6d109bcc3562d51b908ee:1:0',
  output: '6bd2340ff7caec174e7e6405d09122d0447d8f6f5ab6d109bcc3562d51b908ee:1',
  outputValue: 10000,
  owner: 'tb1qaha8rhgsq5z73nvckd53qym0t2jt4jjw3u5s55',
  listed: false,
  satName: 'satname',
  locationBlockHeight: 2437376,
}

const listing: IListingState = {
  seller: {
    makerFeeBp: 100,
    sellerOrdAddress: 'tb1qaha8rhgsq5z73nvckd53qym0t2jt4jjw3u5s55',
    price: 8000,
    ordItem: item,
    sellerReceiveAddress: 'tb1qaha8rhgsq5z73nvckd53qym0t2jt4jjw3u5s55',
    tapInternalKey: '',
  },
}

export default function useListPsbt() {
  const { account, signPsbt } = useWallet()
  const list = useCallback(
    async (price: number) => {
      if (!account) return

      const { listing: listing1, psbt } = await generateUnsignedListingPSBTBase64(listing)
      const signedPsbt = await signPsbt(psbt.toHex())
      const psbtBase64 = Psbt.fromHex(signedPsbt as string, { network: testnet }).toBase64()
      const res = await Services.marketService.listOrder({
        chain: 'btc-testnet',
        inscriptionId: item.id,
        location: item.location,
        locationBlockHeight: item.locationBlockHeight!,
        output: item.output,
        outputValue: item.outputValue,
        contentURI: item.contentURI,
        contentType: item.contentType,
        price,
        makerFeeBp,
        address: account,
        signedListingPSBT: psbtBase64,
      })
      console.log('res', res)
      // listing.seller.signedListingPSBTBase64 = Psbt.fromHex(signedPsbt as string, { network: testnet }).toBase64()
    },
    [account]
  )
  return list
}
