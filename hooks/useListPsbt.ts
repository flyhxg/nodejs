import { useCallback, useState } from 'react'
import { useWallet } from '../app/context/WalletContext'
import { IListingState } from '../lib/msigner'
import { generateUnsignedListingPSBTBase64 } from '../utils/SellerSigner'
import { Psbt } from 'bitcoinjs-lib'
import { testnet } from 'bitcoinjs-lib/src/networks'
import { Services } from '../utils/http/Services'
import { makerFeeBp } from '../utils/constants'
import { DialogType, useDialog } from '../app/context/DialogContext'
import { getErrorMsg } from '../utils'
import { useRequest } from 'ahooks'
import R from '../utils/http/request'
import { env } from '../utils/env'

export default function useListPsbt(id: string) {
  const { account, signPsbt } = useWallet()
  const [loading, setLoading] = useState(false)
  const { openDialog } = useDialog()
  const { data: item } = useRequest(R(Services.marketService.getOrdItem, id), {
    refreshDeps: [id],
    ready: !!id,
  })
  const list = useCallback(
    async (price: number) => {
      if (!account || !item) return
      const listing: IListingState = {
        seller: {
          makerFeeBp,
          sellerOrdAddress: account,
          price,
          ordItem: item,
          sellerReceiveAddress: account,
          tapInternalKey: '',
        },
      }
      listing.seller.price = price
      openDialog(DialogType.Loading, { title: 'Listing Inscription', desc: 'Waiting for sign psbt transaction...' })
      try {
        setLoading(true)
        const { listing: listing1, psbt } = await generateUnsignedListingPSBTBase64(listing)
        const signedPsbt = await signPsbt(psbt.toHex())
        const psbtBase64 = Psbt.fromHex(signedPsbt as string, { network: testnet }).toBase64()
        await Services.marketService.listOrder({
          chain: env.chain,
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
        openDialog(DialogType.Success, { title: 'Listing success.', desc: 'You successfully listed an inscription.' })
        return true
      } catch (e) {
        openDialog(DialogType.Error, { title: 'Listing Inscription Error.', desc: getErrorMsg(e) })
        return false
      } finally {
        setLoading(false)
      }
    },
    [account]
  )
  return { list, loading }
}
