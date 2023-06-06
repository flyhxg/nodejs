'use client'
import styled from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import Image from 'next/image'
import { Images } from '../../../utils/images'
import { XButton } from '../../views/common/XButton'

export default function TxInfoBox() {
  return (
    <InfoBoxWrapper>
      <Title>BoredApeYachtClub #1080</Title>
      <PriceBox>
        <PriceItem>
          <span className={'title'}>Current Price:</span>
          <InfoPrice>
            <BtcIcon /> 0.004 BTC
          </InfoPrice>
        </PriceItem>
        <PriceItem>
          <span className={'title'}>Current Price:</span>
          <InfoPrice>
            <BtcIcon /> 0.004 BTC
          </InfoPrice>
        </PriceItem>
        <PriceItem>
          <span className={'title'}>Current Price:</span>
          <InfoPrice>
            <BtcIcon /> 0.004 BTC
          </InfoPrice>
        </PriceItem>
        <ButtonsGroup>
          <Button>Buy</Button>
          <Button>Make Offer</Button>
        </ButtonsGroup>
      </PriceBox>
      <RarityListWrapper>
        <RarityItem>
          <p>
            <span className={'title'}>Background</span>
            <br />
            <span className={'value'}>Aquamarine</span>
          </p>
          <p>
            <span className={'title'}>Rarity</span>
            <br />
            <span className={'value'}>Yellow(12%)</span>
          </p>
        </RarityItem>
        <RarityItem>
          <p>
            <span className={'title'}>Background</span>
            <br />
            <span className={'value'}>Aquamarine</span>
          </p>
          <p>
            <span className={'title'}>Rarity</span>
            <br />
            <span className={'value'}>Yellow(12%)</span>
          </p>
        </RarityItem>
        <RarityItem>
          <p>
            <span className={'title'}>Background</span>
            <br />
            <span className={'value'}>Aquamarine</span>
          </p>
          <p>
            <span className={'title'}>Rarity</span>
            <br />
            <span className={'value'}>Yellow(12%)</span>
          </p>
        </RarityItem>
        <RarityItem>
          <p>
            <span className={'title'}>Background</span>
            <br />
            <span className={'value'}>Aquamarine</span>
          </p>
          <p>
            <span className={'title'}>Rarity</span>
            <br />
            <span className={'value'}>Yellow(12%)</span>
          </p>
        </RarityItem>
        <RarityItem>
          <p>
            <span className={'title'}>Background</span>
            <br />
            <span className={'value'}>Aquamarine</span>
          </p>
          <p>
            <span className={'title'}>Rarity</span>
            <br />
            <span className={'value'}>Yellow(12%)</span>
          </p>
        </RarityItem>
        <RarityItem>
          <p>
            <span className={'title'}>Background</span>
            <br />
            <span className={'value'}>Aquamarine</span>
          </p>
          <p>
            <span className={'title'}>Rarity</span>
            <br />
            <span className={'value'}>Yellow(12%)</span>
          </p>
        </RarityItem>{' '}
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
  grid-template-columns: repeat(3, 235px);
  grid-template-rows: repeat(2, 70px);
  grid-gap: 11px 7px;
  margin-top: 44px;
`

const RarityItem = styled.div`
  width: 235px;
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
