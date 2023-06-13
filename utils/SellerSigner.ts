import * as bitcoin from 'bitcoinjs-lib'
import { Psbt } from 'bitcoinjs-lib'
import { IListingState } from '../lib/msigner'
import { mempool } from './mempool'
import { network } from './constants'
import { toXOnly } from './transaction'

export async function generateUnsignedListingPSBTBase64(
  listing: IListingState
): Promise<{ listing: IListingState; psbt: Psbt }> {
  const psbt = new bitcoin.Psbt({ network })
  const [ordinalUtxoTxId, ordinalUtxoVout] = listing.seller.ordItem.output.split(':')
  const txId = listing.seller.ordItem.output.split(':')[0]
  const {
    bitcoin: { transactions },
  } = mempool()
  const txHex = await transactions.getTxHex({
    txid: txId,
  })
  const tx = bitcoin.Transaction.fromHex(txHex)

  // No need to add this witness if the seller is using taproot
  if (!listing.seller.tapInternalKey) {
    for (const output in tx.outs) {
      try {
        tx.setWitness(parseInt(output), [])
      } catch {}
    }
  }

  const input: any = {
    hash: ordinalUtxoTxId,
    index: parseInt(ordinalUtxoVout),
    nonWitnessUtxo: tx.toBuffer(),
    // No problem in always adding a witnessUtxo here
    witnessUtxo: tx.outs[parseInt(ordinalUtxoVout)],
    sighashType: bitcoin.Transaction.SIGHASH_SINGLE | bitcoin.Transaction.SIGHASH_ANYONECANPAY,
  }
  // If taproot is used, we need to add the internal key
  if (listing.seller.tapInternalKey) {
    input.tapInternalKey = toXOnly(tx.toBuffer().constructor(listing.seller.tapInternalKey, 'hex'))
  }

  psbt.addInput(input)

  const sellerOutput = getSellerOrdOutputValue(
    listing.seller.price,
    listing.seller.makerFeeBp,
    listing.seller.ordItem.outputValue
  )

  psbt.addOutput({
    address: listing.seller.sellerReceiveAddress,
    value: sellerOutput,
  })

  listing.seller.unsignedListingPSBTBase64 = psbt.toBase64()
  return { listing, psbt }
}

export function getSellerOrdOutputValue(price: number, makerFeeBp: number, prevUtxoValue: number): number {
  return (
    price - // listing price
    Math.floor((price * makerFeeBp) / 10000) + // less maker fees, seller implicitly pays this
    prevUtxoValue // seller should get the rest of ord utxo back
  )
}
