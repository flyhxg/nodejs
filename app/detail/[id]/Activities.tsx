'use client'
import styled from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'

export default function Activities() {
  return (
    <Wrapper>
      <Title>Activities</Title>
      <ComingSoon>Coming Soon</ComingSoon>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 283px;
  background: #1a1a1a;
  ${commonStyles.flexCenter};
  margin-top: 63px;
  position: relative;
`

const ComingSoon = styled.span`
  font-size: 24px;
  color: #9e9e9e;
  line-height: 24px;
`
const Title = styled.h3`
  font-size: 24px;
  color: #efefef;
  position: absolute;
  top: -35px;
  left: 0;
`
