import { Images } from '../../../utils/images'
import { XImage } from '../common/XImage'
import style from './style.module.scss'
export default function Footer() {
  return (
    <footer className={style.footer}>
      <XImage src={Images.COMMON.LOGO_BLACK_SVG} alt="" className={style.logo} />
      <ul className={style.menus}>
        <li>RANKING</li>
        <li>LAUNCHPAD</li>
        <li>INSCRIBE</li>
      </ul>
      <Socials />
      <h3 className={style.market}>@2023 BANANAS Market</h3>
    </footer>
  )
}

const socials = [
  {
    icon: Images.SOCIALS.TWITTER_SVG,
    href: 'https://twitter.com/bananasmarket',
  },
  {
    icon: Images.SOCIALS.DISCORD_SVG,
    href: 'https://discord.gg/txAyHtWE',
  },
  {
    icon: Images.SOCIALS.TELEGRAM_SVG,
    href: '',
  },
]

function Socials() {
  return (
    <div className={style.social}>
      <p className={style.title}>Join The Community</p>
      <div className={style.list}>
        {socials.map((item) => (
          <a key={item.icon} className={style.item} style={{ backgroundImage: `url(${item.icon})` }} href={item.href} />
        ))}
      </div>
    </div>
  )
}
