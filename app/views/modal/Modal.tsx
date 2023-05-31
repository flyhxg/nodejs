'use client'
import { useKeyPress } from 'ahooks'
import Image from 'next/image'
import { CSSProperties, MouseEvent, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import { Images } from '../../../utils/images'

export interface ModalProps {
  style?: CSSProperties
  className?: string
  children?: any
  open: boolean
  onClose: () => void
  maskStyle?: CSSProperties
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  showClose?: boolean
  enableBackgroundScroll?: boolean
  useTransition?: boolean
}

export default function Modal(props: ModalProps) {
  const { closeOnBackdrop, onClose, open } = props
  const onBackDropClick = useCallback(
    (e: MouseEvent) => {
      if (closeOnBackdrop && e.currentTarget === e.target) {
        onClose()
      }
    },
    [closeOnBackdrop, onClose]
  )

  useKeyPress('esc', () => {
    props.closeOnEscape && props.onClose()
  })
  return props.useTransition || props.open
    ? createPortal(
        <ModalWrapper style={props.maskStyle} onClick={onBackDropClick}>
          <ModalBoxWrapper className={props.className} style={props.style}>
            {props.showClose && (
              <CloseIcon
                onClick={() => {
                  props.onClose()
                }}
              />
            )}
            {props.children}
          </ModalBoxWrapper>
          {!props.enableBackgroundScroll && <DisableWindowScroll />}
        </ModalWrapper>,
        document.body
      )
    : null
}

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* top: 0; */
  /* left: 0; */
  opacity: 1;
  //transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
  ${commonStyles.flexCenter};
  /* display: flex;
  justify-content: center;
  align-items: flex-start; */
  z-index: 999999999;
  &.enter {
    background-color: rgba(0, 0, 0, 0);
  }
  &.enter-active {
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  &.exit {
    background-color: rgba(0, 0, 0, 0.5);
  }
  &.exit-active {
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`
const ModalBoxWrapper = styled.div`
  position: relative;
  width: 432px;
  height: auto;
  background: #ffffff;
`
const CloseIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 22px;
  cursor: pointer;
`

const CloseIcon = styled(Image).attrs({
  src: Images.DIALOG.CLOSE_SVG,
  width: 12,
  height: 12,
  alt: 'close',
})`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 14px;
  right: 15px;

  cursor: pointer;
`

const DisableWindowScroll = createGlobalStyle`
  html {
    overflow: hidden;
  }
`
