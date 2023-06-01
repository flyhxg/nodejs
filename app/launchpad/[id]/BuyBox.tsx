'use client'
import styled, { css } from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import Image from 'next/image'
import { XButton } from '../../views/common/XButton'
import { Images } from '../../../utils/images'

export default function BuyBox() {
  return (
    <BoxWrapper>
      <OrderItem>
        <Status />
        <PriceItem>
          <BtcIcon /> 0.004 BTC
        </PriceItem>
        <OrderTime>End</OrderTime>
      </OrderItem>
      <OrderItem active>
        <Status isPublic />
        <PriceItem>
          <BtcIcon /> 0.004 BTC
        </PriceItem>
        <OrderTime>Start In: 00:00:00</OrderTime>
      </OrderItem>
      <ButtonGroups>
        <StyledButton>Buy</StyledButton>
        <StyledButton>View Collection</StyledButton>
      </ButtonGroups>
    </BoxWrapper>
  )
}

const BoxWrapper = styled.div`
  width: 577px;
  margin-top: 44px;
  position: relative;
`

const OrderItem = styled.div<{ active?: boolean }>`
  height: 89px;
  background: #2e2e2e;
  padding-top: 10px;
  padding-left: 18px;
  position: relative;
  margin-bottom: 10px;
  transition: border-color 0.2s linear;
  cursor: pointer;
  border: 2px solid transparent;
  ${(props) =>
    props.active
      ? css`
          border-color: #f5d802;
        `
      : ''}
`

const Status = styled.span.attrs((props) => ({
  children: props.isPublic ? 'Public' : 'Private',
}))<{ isPublic?: boolean }>`
  height: 20px;
  padding: 0 10px;
  background: ${(props) => (props.isPublic ? '#F5D802' : '#818181')};
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  color: #0f0f0f;
  display: inline-block;
`

const PriceItem = styled.p`
  height: 18px;
  ${commonStyles.flexStart};
  margin-top: 20px;
  font-size: 18px;
  line-height: 18px;
  color: #fff;
`
const BtcIcon = styled(Image).attrs({
  width: 15,
  height: 15,
  alt: 'btc logo',
  src: Images.COMMON.LOGO_BTC_SVG,
})`
  width: 15px;
  height: 15px;
  margin-right: 13px;
`

const ButtonGroups = styled.div`
  height: 40px;
  ${commonStyles.flexBetween};
  margin-top: 34px;
`

const StyledButton = styled(XButton)`
  width: 284px;
`

const OrderTime = styled.span`
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  color: #9e9e9e;
  position: absolute;
  top: 12px;
  right: 23px;
`
