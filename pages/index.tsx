import styled from 'styled-components'
import { Image } from '../views/common/Image'
import { Images } from '../utils/images'
import { Header } from '../views/layout/header'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Content>
          <Person />
          <BTC1 />
          <BTC2 />
          <BTC3 />
          <TextWrapper>
            <Text />
            <Socials>
              <a href={'https://twitter.com/bananasmarket'} target={'_blank'}>
                <SocialItem src={Images.SOCIALS.TWITTER_PNG} />
              </a>
              <a href={'https://discord.gg/txAyHtWE'} target={'_blank'}>
                <SocialItem src={Images.SOCIALS.DISCORD_PNG} />
              </a>
            </Socials>
          </TextWrapper>
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

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`

const Socials = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  //position: absolute;
  //left: 345px;
  //bottom: 160px;
  margin-top: 50px;
  @media (max-width: 1920px) {
    left: 18vw;
  }
`

const SocialItem = styled(Image)`
  width: 39px;
  height: 39px;
  margin-right: 17px;
  cursor: pointer;
`
