import { CSSProperties } from 'react'
import Link from 'next/link'
import { env } from '../../../utils/env'
import styled from 'styled-components'

export default function InscriptionLink(props: {
  insId: string
  style?: CSSProperties
  className?: string
  shorten?: number
}) {
  const insId = props.shorten
    ? props.insId.slice(0, props.shorten) + '...' + props.insId.slice(-props.shorten)
    : props.insId

  return (
    <StyledLink target={'_blank'} href={`${env.mempoolAddress}/inscription/${props.insId}`} className={props.className}>
      {insId}
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  color: inherit;
`
