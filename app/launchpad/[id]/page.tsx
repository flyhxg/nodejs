import s from './page.module.scss'
import Image from 'next/image'
import { Images } from '../../../utils/images'
import Link from 'next/link'
import BuyBox from './BuyBox'
export default function Page() {
  return (
    <div className={s.wrapper}>
      <div className={s.txInfoWrapper}>
        <Image src={Images.LAUNCHPAD.COVER_PNG} alt={'nft cover'} className={s.image} width={500} height={500} />
        <TxInfoBox />
      </div>
    </div>
  )
}

function TxInfoBox() {
  return (
    <div className={s.infoBox}>
      <h3 className={s.title}>BoredApeYachtClub</h3>
      <div className={s.linksWrapper}>
        <Link href={''} target={'_blank'} className={s.linkItem}>
          <Image src={Images.COMMON.LINK_SCAN_PNG} alt={'link icon'} width={18} height={18} />
        </Link>
        <Link href={''} target={'_blank'} className={s.linkItem}>
          <Image src={Images.COMMON.LINK_WEBSITE_PNG} alt={'link icon'} width={18} height={18} />
        </Link>
        <Link href={''} target={'_blank'} className={s.linkItem}>
          <Image src={Images.COMMON.LINK_DISCORD_PNG} alt={'link icon'} width={18} height={18} />
        </Link>
        <Link href={''} target={'_blank'} className={s.linkItem}>
          <Image src={Images.COMMON.LINK_TWITTER_PNG} alt={'link icon'} width={18} height={18} />
        </Link>
      </div>
      <p className={s.totalWrapper}>
        Total Supply <span>2000</span>
        Total Sold <span>500</span>
      </p>
      <BuyBox />
    </div>
  )
}
