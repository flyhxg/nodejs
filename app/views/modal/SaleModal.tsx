'use client'
import styled from 'styled-components'
import useListPsbt from '../../../hooks/useListPsbt'
import { commonStyles } from '../../../utils/commonStyles'
import { XButton } from '../common/XButton'
import Modal from './Modal'
import { useState } from 'react'
import { DialogType, useDialog } from '../../context/DialogContext'
import AddressLink from '../common/AddressLink'
import { useWallet } from '../../context/WalletContext'

export default function SaleModal(props: {
  open: boolean
  onClose: () => void
  resolve: (val: boolean) => void
  id: string
}) {
  const { list, loading } = useListPsbt(props.id)
  const [price, setPrice] = useState('')
  const { openDialog } = useDialog()
  const { account } = useWallet()
  return (
    <StyledModal open={props.open} onClose={props.onClose} closeOnBackdrop closeOnEscape>
      <Title>Inscription Not Listed For Sale</Title>
      <InputWrapper>
        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        <ListButton
          isLoading={loading}
          onClick={async () => {
            if (isNaN(+price) || +price < 10000) {
              openDialog(DialogType.Error, { title: 'Sale error.', desc: 'Invalid price, min 10000 sats!' })
            } else {
              const result = await list(+price)
              if (result) {
                props.resolve(true)
              }
            }
          }}
        >
          List Now
        </ListButton>
      </InputWrapper>
      <Tips>
        By Listing Your Item, You Acknowledge That Payment Will Be Sent Directly To Thepayment Address Informed By Your
        Connected Wallet:{' '}
        <span>
          <AddressLink addr={account || ''} shorten={10} />
        </span>
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
