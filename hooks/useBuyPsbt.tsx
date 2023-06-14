import { useWallet } from '../app/context/WalletContext'
import { useCallback, useState } from 'react'
import { mempool } from '../utils/mempool'
import { generateUnsignedBuyingPSBTBase64, selectDummyUTXOs, selectPaymentUTXOs } from '../utils/BuyerSigner'
import { IListingState, IOrdItem } from '../lib/msigner'
import { DUMMY_UTXO_MAX_VALUE } from '../lib/msigner/constant'
import { Psbt } from 'bitcoinjs-lib'
import { testnet } from 'bitcoinjs-lib/src/networks'
import { Services } from '../utils/http/Services'
import { DialogType, useDialog } from '../app/context/DialogContext'
import { getErrorMsg } from '../utils'
import { useModal } from '../app/context/ModalContext'
import PreparWalletModal from '../app/views/modal/PreparWalletModal'
import { makerFeeBp } from '../utils/constants'
import { waitTxConfirmed } from '../utils/transaction'

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
  location: '801c4790c24218138c689624cf6a3983cd092bdf3b809fcb06581d96f473d516:1:0',
  output: '801c4790c24218138c689624cf6a3983cd092bdf3b809fcb06581d96f473d516:1',
  outputValue: 10000,
  owner: 'tb1qf05d2yqlumhr6gk023wne2956ujcrlmw7mnzdn',
  listed: false,
  satName: 'satname',
  locationBlockHeight: 2437414,
}

const listing: IListingState = {
  seller: {
    makerFeeBp,
    sellerOrdAddress: 'tb1qf05d2yqlumhr6gk023wne2956ujcrlmw7mnzdn',
    price: 18000,
    ordItem: item,
    sellerReceiveAddress: 'tb1qf05d2yqlumhr6gk023wne2956ujcrlmw7mnzdn',
    tapInternalKey: '',
  },
}

// async function getOrderData(inscriptionId: string) {
//   const order = await Services.marketService.orderDetail(inscriptionId)
//   const listing:IListingState = {
//     seller: {
//       makerFeeBp,
//       sellerOrdAddress:
//     }
//   }
// }

export enum BuyLoadingStage {
  NotStart,
  LoadUTXO,
  SelectUTXO,
  PrepareWallet,
  GeneratePSBT,
  SignePSBT,
  Merge,
  WaitingConfirm,
  Done,
}

export default function useBuyPsbt() {
  const { account, signPsbt } = useWallet()
  // const createDummyUtxos = useCreateDummyUtxos()
  const [loading, setLoading] = useState<BuyLoadingStage>(BuyLoadingStage.NotStart)
  const { openDialog } = useDialog()
  const { openModal } = useModal()
  const [loadingTx, setLoadingTx] = useState('')
  const buyPsbt = useCallback(async () => {
    try {
      if (!account) return
      const {
        bitcoin: { addresses },
      } = mempool()
      setLoading(BuyLoadingStage.LoadUTXO)
      const utxoList = await addresses.getAddressTxsUtxo({ address: account })
      const sortedUtxoList = utxoList.sort((a, b) => a.value - b.value)
      setLoading(BuyLoadingStage.SelectUTXO)
      const dummyUTXOS = await selectDummyUTXOs(sortedUtxoList)

      if (dummyUTXOS.length < 2) {
        const unqualifiedUtxos = utxoList.filter((x) => x.value > DUMMY_UTXO_MAX_VALUE)
        setLoading(BuyLoadingStage.PrepareWallet)
        //@ts-ignore
        const result = await openModal(PreparWalletModal, { unqualifiedUtxos })
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
      setLoading(BuyLoadingStage.GeneratePSBT)
      const { psbt } = await generateUnsignedBuyingPSBTBase64(listing)
      setLoading(BuyLoadingStage.SignePSBT)
      const hex = await signPsbt(psbt.toHex())
      const base64 = Psbt.fromHex(hex as string, { network: testnet }).toBase64()
      setLoading(BuyLoadingStage.Merge)
      const data = await Services.marketService.mergeOrder({
        chain: 'btc-testnet',
        inscriptionId: item.id,
        output: item.output,
        signedBuyerPSBT: base64,
      })
      setLoading(BuyLoadingStage.WaitingConfirm)
      setLoadingTx(data)
      await waitTxConfirmed(data)
      setLoading(BuyLoadingStage.Done)
      //waiting
      console.log('data', data)
    } catch (e) {
      console.error(e)
      openDialog(DialogType.Error, { title: 'Buy Error.', desc: getErrorMsg(e) })
    } finally {
      setLoading(BuyLoadingStage.NotStart)
    }
  }, [account])
  return { buyPsbt, loading, loadingTx }
}
