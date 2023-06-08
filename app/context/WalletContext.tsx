'use client'
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { NoOperation } from '../../utils'

const WalletContext = createContext<{
  connected: boolean
  account?: string | null
  balance: {
    confirmed: number
    unconfirmed: number
    total: number
  }
  active: () => any
}>({
  connected: false,
  account: null,
  balance: {
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  },
  active: NoOperation,
})

export default function WalletContextProvider(props: { children?: ReactNode }) {
  const [unisatInstalled, setUnisatInstalled] = useState(false)
  const [connected, setConnected] = useState(false)
  const [accounts, setAccounts] = useState<string[]>([])
  const [publicKey, setPublicKey] = useState('')
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  })
  const selfRef = useRef<{ accounts: string[] }>({
    accounts: [],
  })
  const [network, setNetwork] = useState('livenet')
  const self = selfRef.current
  const getBasicInfo = async () => {
    const unisat = (window as any).unisat
    const [address] = await unisat.getAccounts()
    setAddress(address)

    const publicKey = await unisat.getPublicKey()
    setPublicKey(publicKey)

    const balance = await unisat.getBalance()
    setBalance(balance)

    const network = await unisat.getNetwork()
    setNetwork(network)
  }
  const handleAccountsChanged = (_accounts: string[]) => {
    if (self.accounts[0] === _accounts[0]) {
      // prevent from triggering twice
      return
    }
    self.accounts = _accounts
    if (_accounts.length > 0) {
      setAccounts(_accounts)
      setConnected(true)

      setAddress(_accounts[0])

      getBasicInfo()
    } else {
      setConnected(false)
    }
  }

  const handleNetworkChanged = (network: string) => {
    setNetwork(network)
    getBasicInfo()
  }
  useEffect(() => {
    const unisat = (window as any).unisat
    if (unisat) {
      setUnisatInstalled(true)
    } else {
      return
    }
    unisat.getAccounts().then((accounts: string[]) => {
      handleAccountsChanged(accounts)
    })

    unisat.on('accountsChanged', handleAccountsChanged)
    unisat.on('networkChanged', handleNetworkChanged)

    return () => {
      unisat.removeListener('accountsChanged', handleAccountsChanged)
      unisat.removeListener('networkChanged', handleNetworkChanged)
    }
  }, [])
  const active = useCallback(async () => {
    const unisat = (window as any).unisat
    if (!unisat) return
    const result = await unisat.requestAccounts()
    handleAccountsChanged(result)
  }, [])
  return (
    <WalletContext.Provider value={{ connected, account: address, balance, active }}>
      {props.children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  return useContext(WalletContext)
}