'use client'
import styled from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import Image from 'next/image'
import { Images } from '../../../utils/images'

export default function AttrInfoBox() {
  return (
    <BoxWrapper>
      <Title>
        Bored Ape Tacht Club <AuthIcon />
      </Title>
      <AttrItem>
        <span className={'title'}>Inscription ID</span>
        <span className={'value'}>6a25c ... 6i0</span>
      </AttrItem>
      <AttrItem>
        <span className={'title'}>Inscription Number</span>
        <span className={'value'}>411405</span>
      </AttrItem>
      <AttrItem>
        <span className={'title'}>Owner</span>
        <span className={'value'}>6a25c ... 6i0</span>
      </AttrItem>
      <AttrItem>
        <span className={'title'}>Genesis Transaction</span>
        <span className={'value'}>6a25c ... 6i0</span>
      </AttrItem>
      <AttrItem>
        <span className={'title'}>Sat Rarity</span>
        <span className={'value'}>COMMON</span>
      </AttrItem>
      <AttrItem>
        <span className={'title'}>Sat Number</span>
        <span className={'value'}>1923304329432944</span>
      </AttrItem>{' '}
      <AttrItem>
        <span className={'title'}>Sat Name</span>
        <span className={'value'}>afnwdqebmbb</span>
      </AttrItem>
    </BoxWrapper>
  )
}

const BoxWrapper = styled.div`
  width: 500px;
  height: 282px;
  padding: 24px 34px 0 34px;
  margin-top: 59px;
  background: #1a1a1a;
`

const Title = styled.h3`
  font-weight: normal;
  font-size: 20px;
  line-height: 20px;
  color: #ebebeb;
  ${commonStyles.flexStart};
  margin-bottom: 26px;
`

const AuthIcon = styled(Image).attrs({
  width: 16,
  height: 16,
  src: Images.COMMON.AUTHED_SVG,
  alt: 'the project is authed',
})`
  width: 16px;
  height: 16px;
  margin-left: 14px;
`

const AttrItem = styled.p`
  ${commonStyles.flexBetween};
  margin-bottom: 11px;
  span.title {
    font-size: 12px;
    color: #9e9e9e;
  }
  span.value {
    font-size: 14px;
    color: #efefef;
  }
`
