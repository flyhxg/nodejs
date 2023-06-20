import s from './page.module.scss'
import Image from 'next/image'
import { Images } from '../../../utils/images'
import Link from 'next/link'
import TabsContent from './TabsContent'
import Footer from '../../views/footer'
import { Services } from '../../../utils/http/Services'
import { LaunchpadItem } from '../../../utils/http/Services/launchpad'
import BuyBox from './BuyBox'
import { XImage } from '../../views/common/XImage'
import { getImageUri } from '../../../utils'

// const BuyBox = dynamic(() => import('./BuyBox'), { ssr: false })

export default async function Page(props: { params: { id: string } }) {
  const data = await Services.launchpadService.launchpadDetail(+props.params.id, { cache: 'no-store' })
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.txInfoWrapper}>
          <XImage
            src={getImageUri(data.logo, 500)}
            alt={'nft cover'}
            className={s.image}
            style={{ width: 500, height: 500 }}
          />
          <TxInfoBox item={data} />
        </div>
        <TabsContent desc={data.description} />
      </div>
      <Footer />
    </>
  )
}

function TxInfoBox(props: { item: LaunchpadItem }) {
  return (
    <div className={s.infoBox}>
      <h3 className={s.title}>{props.item.name}</h3>
      <div className={s.linksWrapper}>
        {/*{<Link href={''} target={'_blank'} className={s.linkItem}>*/}
        {/*    <Image src={Images.COMMON.LINK_SCAN_PNG} alt={'link icon'} width={18} height={18} />*/}
        {/*  </Link>*/}
        {/*}*/}
        {props.item.website && (
          <Link href={props.item.website} target={'_blank'} className={s.linkItem}>
            <Image src={Images.COMMON.LINK_WEBSITE_PNG} alt={'link icon'} width={18} height={18} />
          </Link>
        )}
        {props.item.discord && (
          <Link href={props.item.discord} target={'_blank'} className={s.linkItem}>
            <Image src={Images.COMMON.LINK_DISCORD_PNG} alt={'link icon'} width={18} height={18} />
          </Link>
        )}
        {props.item.twitter && (
          <Link href={''} target={'_blank'} className={s.linkItem}>
            <Image src={Images.COMMON.LINK_TWITTER_PNG} alt={'link icon'} width={18} height={18} />
          </Link>
        )}
      </div>
      <p className={s.totalWrapper}>
        Total Supply <span>{props.item.totalSupply}</span>
        Total Sold <span>{props.item.totalSold}</span>
      </p>
      <BuyBox item={props.item} />
    </div>
  )
}
