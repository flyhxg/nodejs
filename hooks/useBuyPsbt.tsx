import { useWallet } from '../app/context/WalletContext'
import { useCallback } from 'react'
import { mempool } from '../utils/mempool'
import { generateUnsignedBuyingPSBTBase64, selectDummyUTXOs, selectPaymentUTXOs } from '../utils/BuyerSigner'
import { IListingState, IOrdItem } from '../lib/msigner'
import useCreateDummyUtxos from './useCreateDummyUtxo'
import { DUMMY_UTXO_MAX_VALUE } from '../lib/msigner/constant'
import { Psbt } from 'bitcoinjs-lib'
import { testnet } from 'bitcoinjs-lib/src/networks'
import { Services } from '../utils/http/Services'

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
export default function useBuyPsbt() {
  const { account, signPsbt } = useWallet()
  const createDummyUtxos = useCreateDummyUtxos()
  const buyPsbt = useCallback(async () => {
    if (!account) return
    const {
      bitcoin: { addresses },
    } = mempool()
    const utxoList = await addresses.getAddressTxsUtxo({ address: account })
    const sortedUtxoList = utxoList.sort((a, b) => a.value - b.value)
    const dummyUTXOS = await selectDummyUTXOs(sortedUtxoList)

    if (dummyUTXOS.length < 2) {
      const unqualifiedUtxos = utxoList.filter((x) => x.value > DUMMY_UTXO_MAX_VALUE)
      createDummyUtxos(unqualifiedUtxos)
      return
    }
    const paymentUTXOS = await selectPaymentUTXOs(sortedUtxoList, listing.seller.price, 4, 5, 'fastestFee')
    listing.buyer = {
      takerFeeBp: 0,
      buyerAddress: account,
      buyerTokenReceiveAddress: account,
      feeRateTier: 'fastestFee',
      buyerDummyUTXOs: dummyUTXOS,
      buyerPaymentUTXOs: paymentUTXOS,
    }
    const { psbt } = await generateUnsignedBuyingPSBTBase64(listing)
    const hex = await signPsbt(psbt.toHex())
    const base64 = Psbt.fromHex(hex as string, { network: testnet }).toBase64()

    const data = await Services.marketService.mergeOrder({
      chain: 'btc-testnet',
      inscriptionId: item.id,
      output: item.output,
      signedBuyerPSBT: base64,
    })
  }, [account, createDummyUtxos])
  return buyPsbt
}
