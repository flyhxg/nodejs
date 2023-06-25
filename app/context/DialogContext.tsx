'use client'
import { createContext, useCallback, useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import { commonStyles } from '../../utils/commonStyles'
import { Images } from '../../utils/images'
import { Keyframes } from '../../utils/keyframes'
import { XImage } from '../views/common/XImage'
import Modal from '../views/modal/Modal'

export enum DialogType {
  None,
  Success,
  Error,
  Loading,
}

type DialogOption = {
  title?: string | JSX.Element
  desc?: string | JSX.Element
  content?: React.ReactNode
}

export const DialogContext = createContext<{
  openDialog: (type: DialogType, option?: DialogOption) => void
  close: () => void
}>({
  openDialog: () => {},
  close: () => {},
})

const IconMap: { [key in DialogType]?: string } = {
  [DialogType.Error]: Images.DIALOG.STATUS_WARN_SVG,
  [DialogType.Success]: Images.DIALOG.STATUS_SUCESS_SVG,
  [DialogType.Loading]: Images.DIALOG.STATUS_LOADING_SVG,
}

export default function DialogProvider({ children }: { children: any }) {
  const [type, setType] = useState<DialogType>(DialogType.None)
  const [title, setTitle] = useState<DialogOption['title']>('')
  const [desc, setDesc] = useState<DialogOption['desc']>('')
  const [content, setContent] = useState<React.ReactNode>('')

  const openDialog = useCallback((type: DialogType, option?: DialogOption) => {
    setTitle(option?.title || '')
    setDesc(option?.desc || '')
    setContent(option?.content || '')
    setType(type)
  }, [])

  const close = useCallback(() => {
    openDialog(DialogType.None)
    setTitle('')
    setDesc('')
  }, [openDialog])

  return (
    <DialogContext.Provider value={{ openDialog, close }}>
      {children}
      <StyledModal
        open={type !== DialogType.None}
        onClose={close}
        showClose={type !== DialogType.Loading}
        closeOnEscape={type !== DialogType.Loading}
        closeOnBackdrop={type !== DialogType.Loading}
      >
        {IconMap[type] && <Icon src={IconMap[type]} isLoading={type === DialogType.Loading} />}
        {title && <Title>{title}</Title>}

        {desc && <Desc>{desc}</Desc>}
        {content && <>{content}</>}
      </StyledModal>
    </DialogContext.Provider>
  )
}

export const StyledModal = styled(Modal)`
  background: #2e2e2e !important;
  width: 306px !important;
  height: 325px !important;
  padding-top: 80px;
  flex-direction: column;
  ${commonStyles.flexStart};
`

const Icon = styled(XImage)<{ isLoading: boolean }>`
  display: block;
  width: ${({ isLoading }) => (isLoading ? '75px' : '100px')};
  ${(props) =>
    props.isLoading
      ? css`
          animation: ${Keyframes.rotate} 1.5s linear infinite;
        `
      : ''}
`

const Title = styled.div`
  font-size: 16px;
  font-family: var(--font-upheav);
  color: #fff;
  margin-top: 27px;
  text-align: center;
  line-height: 16px;
`

const Desc = styled.p`
  line-height: 12px;
  margin-top: 22px;
  text-align: center;
  width: 100%;
  word-break: break-all;
  font-size: 12px;
  color: #b9b9b9;
  padding: 0 20px;
`

export function useDialog() {
  return useContext(DialogContext)
}
