export type IGetRawTransactionVerboseResult = {
  txid: string
  hex: string
  blochash: string
  blocktime: number
  confirmations: number
  vin: {
    txid: string
    vout: number
    scriptSig: {
      asm: string
      hex: string
    }
    sequence: number
    txinwitness: string[]
  }[]
  vout: {
    value: number
    n: number
  }[]
}
