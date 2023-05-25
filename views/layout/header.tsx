'use client'
import styled, { createGlobalStyle } from 'styled-components'
import { Images } from '../../utils/images'
import { Image } from '../common/Image'
import Link from 'next/link'

export function Header() {
  return (
    <HeaderWrapper>
      <GlobalStyle />
      <Logo />
      <Menus>
        <Link href={'/market'}>MARKET</Link>
        <Link href={'/launchpad'}>LAUNCHPAD</Link>
      </Menus>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  height: 120px;
  position: relative;
  overflow: hidden;
`
const Logo = styled(Image).attrs({
  src: Images.COMMON.LOGO_PNG,
  width: 252,
  height: 87,
})`
  width: 252px;
  height: 87px;
  position: absolute;
  left: 106px;
  bottom: 0;
`

const GlobalStyle = createGlobalStyle`
  body {
    visibility: visible;
  }
`

const Menus = styled.nav`
  width: 632px;
  margin: 0 auto;
  margin-top: 70px;
  a {
    display: inline-block;
    margin-right: 75px;
    font-size: 20px;
    color: #ababab;
    line-height: 20px;
    outline: none;
    text-decoration: none;
  }
`
