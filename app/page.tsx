'use client'
import styles from './page.module.css'
import styled from 'styled-components'
import { Image } from '../views/common/Image'
import { Images } from '../utils/images'
import { Header } from '../views/layout/header'

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Content>
          <Person />
          <Text />
          <BTC1 />
          <BTC2 />
          <BTC3 />
        </Content>
        <ComingSoon>
          <Line />
          <ComingSoonImage />
          <Line />
        </ComingSoon>
      </main>
    </>
  )
}

const ComingSoon = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 84px;
`
const Line = styled.span`
  display: inline-block;
  max-width: 460px;
  height: 2px;
  background: #7a7a7a;
  flex: 1;
`

const ComingSoonImage = styled(Image).attrs({
  src: Images.HOME.COMING_PNG,
})`
  width: 380px;
  margin: 0 50px;
`

const Content = styled.div`
  position: relative;
  width: 55.8%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 134px;
  left: 50%;
  transform: translateX(-50%);
  @media (max-height: 840px) {
    margin-top: 50px;
  }
`

const Person = styled(Image).attrs({
  src: Images.HOME.PERSON_PNG,
})`
  width: 18vw;
  max-width: 345px;
`

const Text = styled(Image).attrs({
  src: Images.HOME.COMING_TEXT_PNG,
})`
  max-width: 469px;
  width: 24.3vw;
`

const BTC1 = styled(Image).attrs({
  src: Images.HOME.BTC1_PNG,
})`
  position: absolute;
  width: 80px;
  height: 80px;
  bottom: 177px;
  left: -195px;
`
const BTC2 = styled(Image).attrs({
  src: Images.HOME.BTC2_PNG,
})`
  position: absolute;
  width: 110px;
  height: 110px;
  top: -14px;
  right: -124px;
`

const BTC3 = styled(Image).attrs({
  src: Images.HOME.BTC3_PNG,
})`
  position: absolute;
  width: 47px;
  height: 47px;
  bottom: 113px;
  right: 0px;
`
