import Link from 'next/link'
import { env } from '../../../utils/env'
import { CSSProperties } from 'react'
import styled from 'styled-components'

export default function TxHashLink(props: {
  txid: string
  style?: CSSProperties
  className?: string
  shorten?: number
}) {
  const txid = props.shorten
    ? props.txid.slice(0, props.shorten) + '...' + props.txid.slice(-props.shorten)
    : props.txid
  return (
    <StyledLink
      target={'_blank'}
      href={`${env.mempoolAddress}/tx/${props.txid}`}
      className={props.className}
      style={props.style}
    >
      {txid}
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  color: inherit;
`
