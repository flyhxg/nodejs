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
import { OrderDetail } from '../../../utils/http/Services/market'
import { takerFeeBp } from '../../../utils/constants'
import { IOrdItem } from '../../../lib/msigner'
import useCancelListing from '../../../hooks/useCancelListing'

export default function TxInfoBox(props: { order: OrderDetail; nftItem: IOrdItem }) {
  const { buyPsbt, loading, loadingTx } = useBuyPsbt()
  const { account, active, connected } = useWallet()
  const { cancel, loading: cancelLoading } = useCancelListing()

  return (
    <InfoBoxWrapper>
      <Title>BoredApeYachtClub #1080</Title>
      <PriceBox>
        <PriceItem>
          <span className={'title'}>Current Price:</span>
          <InfoPrice>
            <BtcIcon /> {formatSat(props.order.price)} BTC
          </InfoPrice>
        </PriceItem>
        <PriceItem>
          <span className={'title'}>Taker Fee:</span>
          <InfoPrice>
            <BtcIcon /> {formatSat((props.order.price * takerFeeBp) / 10000)} BTC
          </InfoPrice>
        </PriceItem>
        <PriceItem>
          <span className={'title'}>Total:</span>
          <InfoPrice>
            <BtcIcon /> {formatSat(props.order.price + (props.order.price * takerFeeBp) / 10000)} BTC
          </InfoPrice>
        </PriceItem>
        {loading < BuyLoadingStage.WaitingConfirm && (
          <ButtonsGroup>
            {connected ? (
              <NormalButton isLoading={loading > BuyLoadingStage.NotStart} onClick={buyPsbt}>
                Buy
              </NormalButton>
            ) : account === props.nftItem.owner ? (
              <NormalButton
                isLoading={cancelLoading}
                onClick={() => {
                  cancel(props.nftItem.id)
                }}
              >
                Cancel Listing
              </NormalButton>
            ) : (
              <NormalButton onClick={active}>Connect Wallet</NormalButton>
            )}
          </ButtonsGroup>
        )}
        {loading === BuyLoadingStage.WaitingConfirm && (
          <LoadingText>
            <Loading size={24} style={{ marginRight: 16 }} />
            Trading on the chain hash:
            <TxHashLink style={{ color: 'white' }} txid={loadingTx} shorten={10} />
          </LoadingText>
        )}
      </PriceBox>
      <RarityListWrapper>
        {(props.order.attributes || []).map((attr) => (
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
  padding: 28px 74px 0 38px;
  margin-top: 43px;
`

const PriceItem = styled.div`
  height: 18px;
  ${commonStyles.flexBetween};
  margin-bottom: 25px;

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
  grid-template-rows: repeat(2, 70px);
  grid-gap: 11px 7px;
  margin-top: 44px;
`

const RarityItem = styled.div`
  width: 120px;
  height: 70px;
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
