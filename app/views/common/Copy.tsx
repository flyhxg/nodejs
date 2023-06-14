import { CSSProperties } from 'react'
import useCopyClipboard from '../../../hooks/useCopyClipboard'
import styled from 'styled-components'
import { XImage } from './XImage'
import { Images } from '../../../utils/images'

export default function Copy(props: { text: string; icon?: string; style?: CSSProperties; className?: string }) {
  const [isCopied, copy] = useCopyClipboard()
  return (
    <CopyIcon
      onClick={() => {
        copy(props.text)
      }}
      src={props.icon || Images.ICON.ICON_COPY_SVG}
      className={props.className}
      style={props.style}
    />
  )
}

const CopyIcon = styled(XImage)`
  width: 10px;
  height: 10px;
  cursor: pointer;
`
