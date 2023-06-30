import styled from 'styled-components'
import Modal from './Modal'
import { XButton } from '../common/XButton'
import useCreateDummyUtxos from '../../../hooks/useCreateDummyUtxo'
import { AddressTxsUtxo } from '@mempool/mempool.js/lib/interfaces'

export default function PreparWalletModal(props: {
  open: boolean
  onClose: () => void
  resolve: (val: boolean) => void
  unqualifiedUtxos: AddressTxsUtxo[]
  fee: number
}) {
  const { create, loading } = useCreateDummyUtxos(props.fee)
  return (
    <StyledModal
      open={props.open}
      onClose={() => {
        props.resolve(false)
      }}
      showClose
    >
      <Title>Preparing your wallet for trading</Title>
      <Desc>The first purchase requires an initialization transaction.</Desc>
      <PrepareButton
        isLoading={loading}
        onClick={async () => {
          const result = await create(props.unqualifiedUtxos)
          props.resolve(!!result)
        }}
      >
        Prepare your wallet
      </PrepareButton>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: 680px;
  height: 250px;
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

const PrepareButton = styled(XButton)`
  width: 100%;
  margin-top: 50px;
`

const Desc = styled.p`
  color: #efefef;
  margin-top: 20px;
`
