import { useWallet } from '../app/context/WalletContext'
import { useCallback } from 'react'
import { mempool } from '../utils/mempool'
import { generateUnsignedBuyingPSBTBase64, selectDummyUTXOs, selectPaymentUTXOs } from '../utils/BuyerSigner'
import { IListingState, IOrdItem, utxo } from '../lib/msigner'

const item: IOrdItem = {
  id: '83eb8b29c11905f7d94de94cdfd56acde13a82e2da9b393b81435fa855ee7129i0',
  contentType: 'application/json',
  contentURI: 'http://18.222.82.179:8081/content/83eb8b29c11905f7d94de94cdfd56acde13a82e2da9b393b81435fa855ee7129i0',
  contentPreviewURI:
    'http://18.222.82.179:8081/preview/83eb8b29c11905f7d94de94cdfd56acde13a82e2da9b393b81435fa855ee7129i0',
  sat: -1,
  genesisTransaction: '83eb8b29c11905f7d94de94cdfd56acde13a82e2da9b393b81435fa855ee7129',
  genesisTransactionBlockTime: '2023-06-01 10:56:35 UTC',
  inscriptionNumber: 0,
  chain: 'btc-regtest',
  location: '53c99793f704783ecb5c28ef56f6e53995c98341c99e4f4e48b3a4df55bd73c7:0:0',
  output: '53c99793f704783ecb5c28ef56f6e53995c98341c99e4f4e48b3a4df55bd73c7:0',
  outputValue: 9556,
  owner: 'bcrt1pjlxppknmqkqt0lc2fnne6a85nh3jac7rmwtn3glzsn5cxpta3rdskququd',
  listed: false,
  satName: 'satname',
}

export default function useBuyPsbt() {
  const { account } = useWallet()
  const buyPsbt = useCallback(async () => {
    if (!account) return
    const {
      bitcoin: { addresses },
    } = mempool()
    const utxoList = await addresses.getAddressTxsUtxo({ address: account })
    const sortedUtxoList = utxoList.sort((a, b) => a.value - b.value)
    const dummyUTXOS = await selectDummyUTXOs(sortedUtxoList)
    const paymentUTXOS = await selectPaymentUTXOs(sortedUtxoList, 800000, 4, 5, 'fastestFee')
    const listing: IListingState = {
      seller: {
        makerFeeBp: 100,
        sellerOrdAddress: 'bcrt1pjlxppknmqkqt0lc2fnne6a85nh3jac7rmwtn3glzsn5cxpta3rdskququd',
        price: 800000,
        ordItem: item,
        sellerReceiveAddress: 'bcrt1pjlxppknmqkqt0lc2fnne6a85nh3jac7rmwtn3glzsn5cxpta3rdskququd',
        tapInternalKey: '',
      },
      buyer: {
        takerFeeBp: 0,
        buyerAddress: 'bcrt1p2hsze6rsempc3d23kpn4wjyh625rzmncuzf9p00s5wg6xsmyg4sqrps2fl',
        buyerTokenReceiveAddress: 'bcrt1p2hsze6rsempc3d23kpn4wjyh625rzmncuzf9p00s5wg6xsmyg4sqrps2fl',
        feeRateTier: 'fastestFee',
        buyerDummyUTXOs: dummyUTXOS as utxo[],
        buyerPaymentUTXOs: paymentUTXOS as utxo[],
      },
    }
    const res = await generateUnsignedBuyingPSBTBase64(listing)
    // res.buyer?.unsignedBuyingPSBTBase64
    // sign and commit
  }, [account])
  return buyPsbt
}
