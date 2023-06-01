'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { Images } from '../../../utils/images'
import { commonStyles } from '../../../utils/commonStyles'

export default function ProjectInfo() {
  return (
    <Wrapper>
      <InfoWrapper>
        <Logo src={Images.HOME.COVER_PNG} />
        <InfoBox>
          <Title>
            Bored Ape Yacht Club <AuthIcon />
          </Title>
          <ProjectDesc>
            The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living
            on the...igital collectibles living on the...igital collectibles living on the...
            <More>
              More <DownIcon />
            </More>
          </ProjectDesc>
        </InfoBox>
      </InfoWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 1720px;
  margin: 0 100px;
  height: 310px;
  position: relative;
`

const InfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`

const Logo = styled(Image).attrs({
  width: 165,
  height: 165,
  alt: 'Logo',
})`
  width: 165px;
  height: 165px;
  margin-right: 40px;
`

const InfoBox = styled.div`
  padding-top: 20px;
`
const Title = styled.h3`
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  color: #ebebeb;
  ${commonStyles.flexStart}
`

const AuthIcon = styled(Image).attrs({
  width: 16,
  height: 16,
  src: Images.COMMON.AUTHED_SVG,
  alt: 'the project is authed',
})`
  width: 16px;
  height: 16px;
  margin-left: 20px;
`

const ProjectDesc = styled.p`
  font-size: 14px;
  color: #9e9e9e;
  line-height: 14px;
  margin-top: 20px;
  position: relative;
  max-width: 677px;
`

const More = styled.span`
  display: inline-block;
  margin-top: 8px;
  font-size: 16px;
  color: #9e9e9e;
  cursor: pointer;
  ${commonStyles.flexStart};
  position: absolute;
  bottom: -24px;
  left: 0;
`

const DownIcon = styled(Image).attrs({
  width: 7,
  height: 7,
  alt: 'angle',
  src: Images.COMMON.TRIANGLE_SVG,
})`
  width: 7px;
  height: 7px;
  margin-left: 6px;
`
