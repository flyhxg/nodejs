'use client'

import styled from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import { XImage } from '../common/XImage'
import { Images } from '../../../utils/images'
import AddressLink from '../common/AddressLink'
import { useWallet } from '../../context/WalletContext'
import Copy from '../common/Copy'
import { formatSat, parseSat } from '../../../utils'
import Link from 'next/link'

export default function UserCenter() {
  const { account, balance, deActive } = useWallet()
  console.log({ formatSat, parseSat })
  return (
    <UserCenterWrapper
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <MenuItem>
        <MenuIcon src={Images.ICON.ICON_BTC_SVG} />
        <WalletInfo>
          <WalletAddress>
            <AddressLink addr={account || ''} shorten={10} /> <Copy text={account || ''} style={{ marginLeft: 12 }} />
          </WalletAddress>
          <p>{formatSat(balance.total)}</p>
        </WalletInfo>
      </MenuItem>
      <Link href={'/mycollection'}>
        <MenuItem>
          <MenuIcon src={Images.ICON.ICON_ITEM_SVG} /> My Items
        </MenuItem>
      </Link>

      {/*<MenuItem>*/}
      {/*  <MenuIcon src={Images.ICON.ICON_REFRESH_SVG} /> Connect A Different Wallet*/}
      {/*</MenuItem>*/}
      <MenuItem onClick={deActive}>
        <MenuIcon src={Images.ICON.ICON_EXIT_SVG} /> Disconnect
      </MenuItem>
    </UserCenterWrapper>
  )
}

const UserCenterWrapper = styled.div`
  width: 260px;
  height: auto;
  background: #1c1c1c;
  position: relative;
  position: absolute;
  right: 50px;
  top: 100px;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s linear;
  &:hover {
    visibility: visible;
    opacity: 1;
  }
`

const MenuItem = styled.div`
  height: 50px;
  ${commonStyles.flexStart};
  padding-left: 20px;
  position: relative;
  font-size: 16px;
  color: #fefefe;
  transition: all 0.3s linear;
  cursor: pointer;
  p {
    margin: 0;
    line-height: 1em;
  }
  &:hover {
    background: #343434;
  }
`

const MenuIcon = styled(XImage)`
  width: 16px;
  height: 16px;
  margin-right: 14px;
`

const WalletInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  color: #efefef;
`

const WalletAddress = styled.p`
  font-size: 12px;
  margin-bottom: 5px;
`
