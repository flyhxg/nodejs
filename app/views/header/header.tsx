'use client'
import Link from 'next/link'
import { Images } from '../../../utils/images'
import { useDialog } from '../../context/DialogContext'
import { XButton } from '../common/XButton'
import { XImage } from '../common/XImage'
import s from './header.module.scss'
import { useWallet } from '../../context/WalletContext'
import { shortenAddress } from '../../../utils'
import { useRouter } from 'next/navigation'
import UserCenter from './UserCenter'
import styled from 'styled-components'

const menus = [
  { label: 'RANKING', href: '/ranking' },
  { label: 'LAUNCHPAD', href: '/launchpad' },
  { label: 'INSCRIBE', href: '/inscribe' },
  { label: 'PTS [23]', href: 'https://www.baidu.com', target: '_blank' },
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
          <Link key={menu.label} href={menu.href} target={menu.target}>
            {menu.label}
          </Link>
        ))}
      </div>
      <StyledButton
        onClick={() => {
          if (!connected) {
            active()
          } else {
          }
        }}
      >
        {connected ? <>{shortenAddress(account)}</> : <> Connect Wallet</>}
      </StyledButton>
      {connected && <UserCenter />}
    </header>
  )
}

const StyledButton = styled(XButton)`
  &:hover + div {
    opacity: 1;
    visibility: visible;
  }
`
