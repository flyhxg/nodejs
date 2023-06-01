'use client'
import styled from 'styled-components'
import { XButton } from '../common/XButton'

export default function LaunchpadIntro() {
  return (
    <IntroWrapper>
      <Title>LAUNCHPAD</Title>
      <Text>
        Launchpad Helps Projects To launch NFT mystery boxes and helps quality projects to develop better and faster
      </Text>
      <Submit>Submit</Submit>
    </IntroWrapper>
  )
}

const IntroWrapper = styled.div`
  max-width: 1428px;
  position: relative;
  width: 100%;
`

const Title = styled.h3`
  font-size: 24px;
  font-family: var('--font-upheav');
  line-height: 22px;
  color: #efefef;
`
const Text = styled.p`
  font-size: 14px;
  color: #9e9e9e;
  line-height: 14px;
  margin-top: 19px;
  text-transform: capitalize;
`

const Submit = styled(XButton)`
  width: 160px;
  position: absolute;
  top: 6px;
  right: 0;
`
