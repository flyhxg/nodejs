'use client'
import Image from 'next/image'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'
import { Images } from '../../../utils/images'
import { Keyframes } from '../../../utils/keyframes'

export const XButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean; loadingText?: string }
>((props, ref) => (
  <StyledButton {...props} ref={ref}>
    {props.isLoading ? (
      <>
        <LoadingIcon /> {props.loadingText}
      </>
    ) : (
      props.children
    )}
  </StyledButton>
))

const StyledButton = styled.button<{ isLoading?: boolean }>`
  width: 200px;
  height: 40px;
  background: #f5d802;
  line-height: 40px;
  font-size: 16px;
  color: #0f0f0f;
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s linear;
  pointer-events: ${(props) => (props.isLoading ? 'none' : 'inherit')};
  &:hover {
    background: #ffef7d;
  }
  &:active {
    background: #c0aa08;
  }
  &[disabled] {
    background-color: #828282;
    pointer-events: none;
  }
`

const LoadingIcon = styled(Image).attrs({
  src: Images.COMMON.LOADING_SVG,
  width: 24,
  height: 24,
  alt: 'loading',
})`
  width: 24px;
  height: 24px;
  animation: ${Keyframes.rotate} 1.5s linear infinite;
`
