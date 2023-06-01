'use client'
import styled from 'styled-components'
import Modal from './Modal'
import { commonStyles } from '../../../utils/commonStyles'
import { XButton } from '../common/XButton'

export default function SaleModal(props: { open: boolean; onClose: () => void; resolve: () => void }) {
  return (
    <StyledModal open={props.open} onClose={props.onClose} closeOnBackdrop closeOnEscape>
      <Title>Inscription Not Listed For Sale</Title>
      <InputWrapper>
        <Input />
        <ListButton>List Now</ListButton>
      </InputWrapper>
      <Tips>
        By Listing Your Item, You Acknowledge That Payment Will Be Sent Directly To Thepayment Address Informed By Your
        Connected Wallet: <span>Bc1 Pz ... 3ca</span>
      </Tips>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: 680px;
  height: 210px;
  background: #000;
  padding: 37px 50px 0 50px;
  position: relative;
`

const Title = styled.h3`
  font-size: 16px;
  color: #efefef;
  line-height: 16px;
  text-transform: capitalize;
  font-weight: normal;
`

const InputWrapper = styled.div`
  ${commonStyles.flexBetween};
  margin-top: 30px;
`

const Input = styled.input.attrs({
  placeholder: 'List Price(BTC)',
})`
  width: 283px;
  height: 40px;
  background: #525252;
  padding: 0 20px;
  outline: none;
  border: none;
  font-size: 16px;
  color: #8d8d8d;
`

const ListButton = styled(XButton)`
  width: 283px;
`

const Tips = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: #9e9e9e;
  margin-top: 24px;
  span {
    color: #f5d802;
  }
`
