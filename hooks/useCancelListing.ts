import { IOrdItem } from '../lib/msigner'
import { useCallback, useState } from 'react'
import { useWallet } from '../app/context/WalletContext'
import { env } from '../utils/env'
import { Services } from '../utils/http/Services'
import { DialogType, useDialog } from '../app/context/DialogContext'
import { getErrorMsg } from '../utils'

export default function useCancelListing() {
  const { account, signMessage, publicKey } = useWallet()
  const [loading, setLoading] = useState(false)
  const { openDialog } = useDialog()
  const cancel = useCallback(
    async (id: string) => {
      if (!account || !publicKey) return false
      try {
        setLoading(true)
        const text = `cancel:${id}`
        const signedText = await signMessage(text)
        const params = {
          address: account,
          inscriptionId: id,
          chain: env.chain,
          signMessage: signedText,
          // publicKey,
        }
        const res = await Services.marketService.cancelOrder(params)
        return true
      } catch (e) {
        openDialog(DialogType.Error, { title: 'Cancel Error.', desc: getErrorMsg(e) })
        return false
      } finally {
        setLoading(false)
      }
    },
    [account, publicKey]
  )
  return { cancel, loading }
}
