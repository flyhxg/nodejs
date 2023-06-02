'use client'
import Link from 'next/link'
import { Images } from '../../../utils/images'
import { DialogType, useDialog } from '../../context/DialogContext'
import { XButton } from '../common/XButton'
import { XImage } from '../common/XImage'
import s from './header.module.scss'

const menus = [
  { label: 'RANKING', href: '/ranking' },
  { label: 'LAUNCHPAD', href: '/launchpad' },
  { label: 'INSCRIBE', href: '/inscribe' },
  { label: 'PTS [23]', href: 'https://www.baidu.com', target: '_blank' },
]

export default function Header() {
  const { openDialog } = useDialog()
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
      <XButton
        onClick={() => {
          openDialog(DialogType.Loading, { title: 'Success', desc: 'Something is ok!' })
        }}
      >
        Connect Wallet
      </XButton>
    </header>
  )
}
