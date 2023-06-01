'use client'
import styled from 'styled-components'
import { XButton } from '../common/XButton'
import { commonStyles } from '../../../utils/commonStyles'
import { Images } from '../../../utils/images'

export function LaunchpadCard() {
  return (
    <CardWrapper>
      <CardImage src={Images.HOME.COVER_PNG}>
        <StatusLabel>Live</StatusLabel>
      </CardImage>
      <InfoWrapper>
        <InfoTitle>I’m a NFT nameI’m a NFT name</InfoTitle>
        <InfoDesc>
          launchpad helps projects to launch NFT mystery boxes and helps quality projects to develop better and
          fasterbetter and faster’ sbetter and faster..
        </InfoDesc>
        <LaunchButton>Launch</LaunchButton>
      </InfoWrapper>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  width: 430px;
  height: 338px;
  position: relative;
  background: #2e2e2e;
`

const CardImage = styled.div<{ src: string }>`
  height: 200px;
  ${commonStyles.bgImage};
  background-image: url(${(props) => props.src});
`
const InfoWrapper = styled.div`
  height: 138px;
  padding: 18px 30px 0 30px;
`
const InfoTitle = styled.h3`
  font-size: 16px;
  line-height: 16px;
  color: #efefef;
`
const InfoDesc = styled.p`
  font-size: 12px;
  line-height: 12px;
  color: #9e9e9e;
  margin-top: 15px;
`

const LaunchButton = styled(XButton)`
  width: 362px;
  height: 27px;
  margin-top: 15px;
`

const StatusLabel = styled.span`
  min-width: 50px;
  display: inline-block;
  padding: 14px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  font-size: 12px;
  color: white;
  position: absolute;
  top: 9px;
  left: 31px;
`
