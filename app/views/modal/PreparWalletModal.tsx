import styled from 'styled-components'
import Modal from './Modal'
import { XButton } from '../common/XButton'
import useCreateDummyUtxos from '../../../hooks/useCreateDummyUtxo'
import { AddressTxsUtxo } from '@mempool/mempool.js/lib/interfaces'
import { sleep } from '../../../utils'
import { mempool } from '../../../utils/mempool'
import { BuyLoadingStage } from '../../../hooks/useBuyLaunchpad'

export default function PreparWalletModal(props: {
  open: boolean
  onClose: () => void
  resolve: (val: boolean) => void
  unqualifiedUtxos: AddressTxsUtxo[]
}) {
  const { create, loading } = useCreateDummyUtxos()
  return (
    <StyledModal
      open={props.open}
      onClose={() => {
        props.resolve(false)
      }}
      showClose
    >
      <Title>Preparing your wallet for trading</Title>
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
  height: 500px;
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
