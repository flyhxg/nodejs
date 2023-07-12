import styled, { css } from 'styled-components'
import { XImage } from './XImage'
import { Images } from '../../../utils/images'
import { CSSProperties } from 'react'
import { Keyframes } from '../../../utils/keyframes'
import { commonStyles } from '../../../utils/commonStyles'

export default function Loading(props: {
  size: number
  className?: string
  style?: CSSProperties
  type?: 'white' | 'black'
}) {
  const size = props.size || 24
  return (
    <LoadingIcon
      size={size}
      src={props.type === 'black' ? Images.COMMON.LOADING_SVG : Images.COMMON.STATUS_LOADING_SVG}
      className={props.className}
      style={props.style}
    />
  )
}

const LoadingIcon = styled(XImage)<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: inline-block;
  animation: ${Keyframes.rotate} 1.5s linear infinite;
`

export function LoadingFrame(props: { size: number; top?: number; style?: CSSProperties; className?: string }) {
  return (
    <FrameWrapper top={props.top} className={props.className} style={props.style}>
      <Loading size={props.size} />
    </FrameWrapper>
  )
}
const FrameWrapper = styled.div<{ top?: number }>`
  width: 50%;
  height: 50%;
  position: relative;
  ${(props) =>
    props.top
      ? css`
          margin-top: ${props.top}px;
        `
      : commonStyles.flexCenter};
`
