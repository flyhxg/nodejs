'use client'
import styled from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import { Images } from '../../../utils/images'
import Image from 'next/image'
import { XButton } from '../../views/common/XButton'
import { XImage } from '../../views/common/XImage'
import Link from 'next/link'
import { OrderItem } from '../../../utils/http/Services/project'
import { formatSat, getImageUri } from '../../../utils'
import { Display, OrderStatus } from '../../../utils/type'
import { useWallet } from '../../context/WalletContext'
import Loading from '../../views/common/Loading'

export default function ItemCard(props: { order: OrderItem }) {
  // const { display } = useFilterContext()
  const { account } = useWallet()
  const isPending = props.order.order_status === OrderStatus.Pending
  return (
    <Link href={`/detail/${props.order.inscription_id}`}>
      <CardWrapper>
        <CardWithName>
          <CardImage src={getImageUri(props.order.content_uri)} />
          <Name>{props.order.name}</Name>
          {isPending && (
            <LoadingCard>
              <Loading size={20} />
            </LoadingCard>
          )}
        </CardWithName>
        <InfoPrice>
          <BtcIcon />
          {formatSat(props.order.price)} BTC
        </InfoPrice>
        <SplitLine />
        <Label>Last Sale: {formatSat(props.order.last_sale_price)}</Label>
        {/*@ts-ignore*/}
        {account !== props.order.owner && !isPending && (
          <SaleButton>
            <SaleIcon /> Buy
          </SaleButton>
        )}
      </CardWrapper>
    </Link>
  )
}

const CardWrapper = styled.div`
  width: 260px;
  height: 335px;
  position: relative;
  background: #2e2e2e;
  overflow: hidden;
`
const LoadingCard = styled.div`
  height: 225px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
`

const CardWithName = styled.div`
  position: relative;
`

const CardImage = styled.div<{ src: string; display?: Display }>`
  height: 225px;
  ${commonStyles.bgImage};
  background-image: url(${(props) => props.src});
  position: relative;
  background-size: cover;
`

const InfoWrapper = styled.div`
  //height: 110px;
  position: relative;
  padding: 0px 17px 0 17px;
`

const InfoTitle = styled.h3`
  font-size: 16px;
  color: #efefef;
  line-height: 16px;
`

const Name = styled(InfoTitle)`
  margin-top: 19px;
  padding-left: 17px;
`

const InfoPrice = styled(InfoTitle)`
  margin-top: 15px;
  ${commonStyles.flexStart};
  padding-left: 17px;
`

const BtcIcon = styled(Image).attrs({
  src: Images.COMMON.LOGO_BTC_SVG,
  width: 15,
  height: 15,
  alt: 'btc',
})`
  width: 15px;
  height: 15px;
  margin-right: 6px;
`
const SplitLine = styled.span`
  display: block;
  width: 210px;
  height: 1px;
  background-color: #3e3e3e;
  margin-top: 7px;
  margin-left: 25px;
`
const Label = styled.p`
  font-size: 12px;
  line-height: 12px;
  color: #9e9e9e;
  margin-top: 12px;
  margin-left: 21px;
`

const SaleButton = styled(XButton)`
  height: 37px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  justify-content: flex-start;
  padding-left: 21px;
  transition: all 0.2s linear;
  opacity: 0;
  transform: translateY(37px);

  ${CardWrapper}:hover > & {
    opacity: 1;
    transform: translateY(0px);
  }
`

const SaleIcon = styled(XImage).attrs({
  src: Images.COMMON.ICON_BUY_SVG,
})`
  width: 8px;
  height: 15px;
  margin-right: 11px;
`
