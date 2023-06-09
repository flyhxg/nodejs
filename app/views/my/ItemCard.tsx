'use client'
import styled from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import { Images } from '../../../utils/images'
import { XButton } from '../common/XButton'
import { XImage } from '../common/XImage'
import { useModal } from '../../context/ModalContext'
import SaleModal from '../modal/SaleModal'
import Link from 'next/link'

export default function ItemCard() {
  const { openModal } = useModal()
  return (
    <Link href={'/detail/1'}>
      <CardWrapper>
        <CardImage src={Images.HOME.COVER_PNG}>
          <OnSale>On Sale</OnSale>
        </CardImage>
        <InfoWrapper>
          <InfoTitle>I`m A NFT Name</InfoTitle>
          <InfoText>Inscription #043244</InfoText>
          <SplitLine />
          <Label>Battle Of BTC</Label>
        </InfoWrapper>
        <SaleButton
          onClick={(e) => {
            e.stopPropagation()
            //@ts-ignore
            openModal(SaleModal)
          }}
        >
          <SaleIcon /> Sale
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

const OnSale = styled.span`
  width: 67px;
  height: 25px;
  background-color: #f5d802;
  position: absolute;
  top: 11px;
  left: 17px;
  color: #0f0f0f;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
`

const InfoWrapper = styled.div`
  height: 110px;
  position: relative;
  padding: 24px 17px 0 17px;
`

const InfoTitle = styled.h3`
  font-size: 16px;
  color: #efefef;
  line-height: 16px;
`

const InfoText = styled.p`
  font-size: 12px;
  line-height: 12px;
  color: #9e9e9e;
  margin-top: 8px;
`
const SplitLine = styled.span`
  display: block;
  width: 210px;
  height: 1px;
  background-color: #3e3e3e;
  margin-top: 15px;
`
const Label = styled.p`
  font-size: 12px;
  line-height: 12px;
  color: #9e9e9e;
  margin-top: 10px;
`

const SaleButton = styled(XButton)`
  height: 37px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  justify-content: flex-start;
  padding-left: 21px;
`

const SaleIcon = styled(XImage).attrs({
  src: Images.COMMON.SALE_SVG,
})`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`
