import * as bitcoin from 'bitcoinjs-lib'
import { isTest } from './env'

export const network = isTest ? bitcoin.networks.testnet : bitcoin.networks.bitcoin

export const launchpadMakerFeeBp = 0
export const launchpadTakerFeeBp = 0

export const makerFeeBp = 200
export const takerFeeBp = 200
export const minFee = 1000
