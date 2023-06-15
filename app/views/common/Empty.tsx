import { CSSProperties } from 'react'
import styled, { css } from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'

export default function Empty(props: { style?: CSSProperties; className?: string; size?: number; top?: number }) {
  return (
    <EmptyWrapper top={props.top} size={props.size}>
      No Data
    </EmptyWrapper>
  )
}

const EmptyWrapper = styled.div<{ top?: number; size?: number }>`
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  position: relative;
  font-size: ${(props) => props.size || 20}px;
  ${(props) =>
    props.top
      ? css`
          margin-top: ${props.top}px;
        `
      : commonStyles.flexCenter};
`
