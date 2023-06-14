'use client'
import styled from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import { Images } from '../../../utils/images'
import Image from 'next/image'
import { XButton } from '../../views/common/XButton'
import { XImage } from '../../views/common/XImage'
import Link from 'next/link'
import { OrderItem } from '../../../utils/http/Services/project'
import { formatSat } from '../../../utils'

export default function ItemCard(props: { order: OrderItem }) {
  return (
    <Link href={'/detail/1'}>
      <CardWrapper>
        <CardImage src={Images.HOME.COVER_PNG}></CardImage>
        <InfoWrapper>
          <InfoTitle>{props.order.name}</InfoTitle>
          <InfoPrice>
            <BtcIcon />
            {formatSat(props.order.price)} BTC
          </InfoPrice>
          <SplitLine />
          <Label>Battle Of BTC</Label>
        </InfoWrapper>
        {/*@ts-ignore*/}
        <SaleButton>
          <SaleIcon /> Buy
        </SaleButton>
      </CardWrapper>
    </Link>
  )
}

const CardWrapper = styled.div`
  width: 260px;
  height: 335px;
  position: relative;
  background: #2e2e2e;
`
const CardImage = styled.div<{ src: string }>`
  height: 225px;
  ${commonStyles.bgImage};
  background-image: url(${(props) => props.src});
  position: relative;
  background-size: cover;
`

const InfoWrapper = styled.div`
  height: 110px;
  position: relative;
  padding: 19px 17px 0 17px;
`

const InfoTitle = styled.h3`
  font-size: 16px;
  color: #efefef;
  line-height: 16px;
`

const InfoPrice = styled(InfoTitle)`
  margin-top: 15px;
  ${commonStyles.flexStart}
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
`
const Label = styled.p`
  font-size: 12px;
  line-height: 12px;
  color: #9e9e9e;
  margin-top: 12px;
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

  :hover > & {
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
