'use client'
import Link from 'next/link'
import { Images } from '../../../utils/images'
import { XButton } from '../common/XButton'
import { XImage } from '../common/XImage'
import s from './header.module.scss'
import { useWallet } from '../../context/WalletContext'
import { shortenAddress } from '../../../utils'
import UserCenter from './UserCenter'
import styled from 'styled-components'
import ComingSoon from '../common/ComingSoon'

const menus = [
  { label: 'RANKING', href: '#', comingSoon: true },
  // { label: 'LAUNCHPAD', href: '/launchpad', comingSoon: true },
  { label: 'INSCRIBE', href: '#', comingSoon: true },
  { label: 'AIRDROP', href: '#', target: '_blank', comingSoon: true },
]

export default function Header() {
  const { active, connected, account } = useWallet()
  return (
    <header className={s.headerWrapper}>
      <Link href={'/'}>
        <XImage className={s.logo} src={Images.COMMON.LOGO_WHITE_SVG} />
      </Link>
      <div className={s.menusWrapper}>
        {menus.map((menu) => (
          <Link
            key={menu.label}
            href={menu.href}
            target={menu.target}
            onClick={(e) => {
              if (menu.comingSoon) {
                e.preventDefault()
              }
            }}
          >
            {menu.label}
            {menu.comingSoon && <ComingSoon style={{ left: -65 }} />}
          </Link>
        ))}
      </div>
      <StyledButton
        onClick={() => {
          if (!connected || !account) {
            active()
          } else {
          }
        }}
      >
        {connected && account ? <>{shortenAddress(account)}</> : <> Connect Wallet</>}
      </StyledButton>
      {connected && account && <UserCenter />}
    </header>
  )
}

const StyledButton = styled(XButton)`
  &:hover + div {
    opacity: 1;
    visibility: visible;
  }
`
