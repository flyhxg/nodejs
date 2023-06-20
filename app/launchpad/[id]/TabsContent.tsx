'use client'

import styled from 'styled-components'
import Tabs, { TabItem } from '../../views/common/Tabs'

export default function TabsContent(props: { about: string; rule: string }) {
  return (
    <StyledTab>
      <TabItem name={'About'}>
        <About>
          <AboutText>{props.about}</AboutText>
        </About>
      </TabItem>
      <TabItem name={'Whitelist Rules'}>
        <About>
          <AboutText>{props.rule}</AboutText>
        </About>
      </TabItem>
    </StyledTab>
  )
}

const StyledTab = styled(Tabs)`
  margin-top: 66px;
`
const About = styled.div`
  height: 334px;
  background: #2e2e2e;
  padding: 35px 110px 0 25px;
  margin-top: 15px;
`
const AboutText = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: #9e9e9e;
  white-space: pre-line;
`
