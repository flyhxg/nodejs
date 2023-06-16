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
import { makerFeeBp, takerFeeBp } from '../utils/constants'
import { waitTxConfirmed } from '../utils/transaction'

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

export default function useBuyLaunchpad(nftItem?: IOrdItem, price?: number) {
  const { account, signPsbt } = useWallet()
  const [loading, setLoading] = useState<BuyLoadingStage>(BuyLoadingStage.NotStart)
  const { openDialog } = useDialog()
  const { openModal } = useModal()
  const [loadingTx, setLoadingTx] = useState('')
  const buyPsbt = useCallback(
    async (launchpadId: number) => {
      try {
        if (!account || !nftItem || !price) return false
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
          return false
        }
        const listing: IListingState = {
          seller: {
            makerFeeBp,
            sellerOrdAddress: nftItem.owner,
            price: price,
            ordItem: nftItem,
            sellerReceiveAddress: nftItem.owner,
            tapInternalKey: '',
          },
        }
        const paymentUTXOS = await selectPaymentUTXOs(sortedUtxoList, listing.seller.price, 4, 5, 'fastestFee')

        listing.buyer = {
          takerFeeBp,
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
        const data = await Services.launchpadService.buyLaunchpad({
          launchpadId: launchpadId,
          inscriptionId: nftItem.id,
          signedBuyerPSBT: base64,
        })
        setLoading(BuyLoadingStage.WaitingConfirm)
        setLoadingTx(data)
        await waitTxConfirmed(data)
        setLoading(BuyLoadingStage.Done)
        //waiting
        console.log('data', data)
        return true
      } catch (e) {
        console.error(e)
        openDialog(DialogType.Error, { title: 'Buy Error.', desc: getErrorMsg(e) })
        return false
      } finally {
        setLoading(BuyLoadingStage.NotStart)
      }
    },
    [account, price, nftItem]
  )
  return { buyPsbt, loading, loadingTx }
}
