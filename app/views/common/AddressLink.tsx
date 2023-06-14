import { CSSProperties } from 'react'
import Link from 'next/link'
import { env } from '../../../utils/env'
import styled from 'styled-components'

export default function AddressLink(props: {
  addr: string
  style?: CSSProperties
  className?: string
  shorten?: number
}) {
  const addr = props.shorten
    ? props.addr.slice(0, props.shorten) + '...' + props.addr.slice(-props.shorten)
    : props.addr

  return (
    <StyledLink target={'_blank'} href={`${env.mempoolAddress}/address/${props.addr}`} className={props.className}>
      {addr}
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  color: inherit;
`
