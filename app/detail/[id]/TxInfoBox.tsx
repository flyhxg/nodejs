'use client'
import Image from 'next/image'
import styled from 'styled-components'
import useBuyPsbt, { BuyLoadingStage } from '../../../hooks/useBuyPsbt'
import { commonStyles } from '../../../utils/commonStyles'
import { Images } from '../../../utils/images'
import { useWallet } from '../../context/WalletContext'
import { XButton } from '../../views/common/XButton'
import Loading from '../../views/common/Loading'
import TxHashLink from '../../views/common/TxHashLink'
import { formatSat } from '../../../utils'
import { makerFeeBp, minFee, takerFeeBp } from '../../../utils/constants'
import { IOrdItem } from '../../../lib/msigner'
import useCancelListing from '../../../hooks/useCancelListing'
import { useModal } from '../../context/ModalContext'
import SaleModal from '../../views/modal/SaleModal'
import { useRequest } from 'ahooks'
import R from '../../../utils/http/request'
import { Services } from '../../../utils/http/Services'
import { OrderStatus } from '../../../utils/type'

export default function TxInfoBox(props: { nftItem: IOrdItem }) {
  const { account, active, connected } = useWallet()

  const { data: order } = useRequest(
    R(Services.marketService.orderDetail, { buyer_address: account as string, inscription_id: props.nftItem.id }),
    {
      // ready: !!account,
      refreshDeps: [account],
    }
  )
  const price = order?.price || 0
  const takerFeeBp = order?.taker_fee || 0
  const makerFeeBp = order?.maker_fee || 0
  const takerFee = (price * takerFeeBp) / 10000
  const makerFee = (price * makerFeeBp) / 10000
  const { buyPsbt, loading, loadingTx } = useBuyPsbt(props.nftItem, price, takerFeeBp, makerFeeBp)
  const { cancel, loading: cancelLoading } = useCancelListing()
  const isOwner = props.nftItem.owner === account
  const showConnect = !connected
  const showBuy =
    loading < BuyLoadingStage.WaitingConfirm && connected && props.nftItem.listed && !isOwner && !order?.padding_tx_hash
  const showListing = !props.nftItem.listed && isOwner && connected
  const showTxLoading =
    loading === BuyLoadingStage.WaitingConfirm || (!!order?.padding_tx_hash && order?.status === OrderStatus.Pending)
  const showCancel = props.nftItem.listed && isOwner && connected && !showTxLoading
  const loadingHash = loadingTx || order?.padding_tx_hash || ''

  const { openModal } = useModal()

  return (
    <InfoBoxWrapper>
      <Title>
        {order?.name} (Inscription #{props.nftItem.inscriptionNumber})
      </Title>
      <PriceBox>
        <PriceItem>
          <span className={'title'}>Current Price:</span>
          <InfoPrice>
            <BtcIcon /> {formatSat(price)} BTC
          </InfoPrice>
        </PriceItem>
        {takerFee > 0 && (
          <PriceItem>
            <span className={'title'}>Taker Fee:</span>
            <InfoPrice>
              <BtcIcon /> {formatSat(takerFee)} BTC
            </InfoPrice>
          </PriceItem>
        )}
        {makerFee > 0 && (
          <PriceItem>
            <span className={'title'}>Maker Fee:</span>
            <InfoPrice>
              <BtcIcon /> {formatSat(makerFee)} BTC
            </InfoPrice>
          </PriceItem>
        )}
        <PriceItem>
          <span className={'title'}>Total:</span>
          <InfoPrice>
            <BtcIcon /> {formatSat(price + (price * takerFeeBp) / 10000)} BTC
          </InfoPrice>
        </PriceItem>
        <ButtonsGroup>
          {showBuy && (
            <NormalButton
              isLoading={loading > BuyLoadingStage.NotStart}
              onClick={async () => {
                const result = await buyPsbt()
                if (result) {
                  location.reload()
                }
              }}
            >
              Buy
            </NormalButton>
          )}
          {showConnect && <NormalButton onClick={active}>Connect Wallet</NormalButton>}
          {showListing && (
            <NormalButton
              onClick={async () => {
                //@ts-ignore
                const result = await openModal(SaleModal, { id: props.nftItem.id })
                if (result) {
                  location.reload()
                }
              }}
            >
              Sale
            </NormalButton>
          )}
          {showCancel && (
            <NormalButton
              isLoading={cancelLoading}
              onClick={async () => {
                const result = await cancel(props.nftItem.id)
                if (result) {
                  location.reload()
                }
              }}
            >
              Cancel Listing
            </NormalButton>
          )}
        </ButtonsGroup>
        {showTxLoading && (
          <LoadingText>
            <Loading size={24} style={{ marginRight: 16 }} />
            Trading on the chain hash:
            <TxHashLink style={{ color: 'white' }} txid={loadingHash} shorten={10} />
          </LoadingText>
        )}
      </PriceBox>
      <RarityListWrapper>
        {(order?.attributes || []).map((attr) => (
          <RarityItem key={attr.trait_type}>
            <p>
              <span className={'title'}>{attr.trait_type}</span>
              <br />
              <span className={'value'}>{attr.value}</span>
            </p>
          </RarityItem>
        ))}
      </RarityListWrapper>
    </InfoBoxWrapper>
  )
}

const InfoBoxWrapper = styled.div`
  height: 500px;
  position: relative;
  padding-top: 15px;
  flex: 1;
`

const Title = styled.h3`
  font-weight: normal;
  color: #efefef;
  font-size: 26px;
  line-height: 26px;
`

const PriceBox = styled.div`
  height: 216px;
  background: #1a1a1a;
  position: relative;
  padding: 20px 74px 20px 38px;
  margin-top: 43px;
  ${commonStyles.flexBetween};
  flex-direction: column;
`

const PriceItem = styled.div`
  height: 18px;
  ${commonStyles.flexBetween};
  //margin-bottom: 25px;
  width: 100%;

  span.title {
    font-size: 12px;
    color: #9e9e9e;
    line-height: 12px;
  }
`

const InfoTitle = styled.h3`
  font-size: 18px;
  color: #efefef;
  line-height: 18px;
`
const InfoPrice = styled(InfoTitle)`
  ${commonStyles.flexEnd}
`

const BtcIcon = styled(Image).attrs({
  src: Images.COMMON.LOGO_BTC_SVG,
  width: 15,
  height: 15,
  alt: 'btc icon',
})`
  width: 15px;
  height: 15px;
  margin-right: 13px;
`

const ButtonsGroup = styled.div`
  ${commonStyles.flexBetween};
  margin-top: 29px;
`
const Button = styled(XButton)`
  width: 299px;
`

const RarityListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 120px);
  grid-template-rows: repeat(2, auto);
  grid-gap: 11px 7px;
  margin-top: 44px;
`

const RarityItem = styled.div`
  width: 120px;
  min-height: 70px;
  position: relative;
  padding-top: 18px;
  padding-left: 22px;
  padding-right: 23px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #1a1a1a;

  p {
    span.title {
      font-size: 14px;
      color: #efefef;
    }

    span.value {
      font-size: 12px;
      color: #9e9e9e;
      margin-top: 11px;
      display: inline-block;
    }
  }
`

const NormalButton = styled(XButton)`
  width: 617px;
`

const LoadingText = styled.p`
  margin-top: 29px;
  line-height: 24px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  ${commonStyles.flexCenter}
`
