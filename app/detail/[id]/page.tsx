import s from './page.module.scss'
import Image from 'next/image'
import { Images } from '../../../utils/images'
import TxInfoBox from './TxInfoBox'
import AttrInfoBox from './AttrInfoBox'
import Activities from './Activities'
import Footer from '../../views/footer'
import { Services } from '../../../utils/http/Services'

export default async function Page(props: { params: { id: string } }) {
  const id = props.params.id
  const [order, nftItem] = await Promise.all([
    Services.marketService.orderDetail(id, { cache: 'no-store' }),
    Services.marketService.getOrdItem(id, { cache: 'no-store' }),
  ])
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.left}>
          <Image src={Images.LAUNCHPAD.COVER_PNG} alt={'cover'} width={500} height={500} />
          <AttrInfoBox nftItem={nftItem} />
        </div>
        <div className={s.right}>
          <TxInfoBox order={order} nftItem={nftItem} />
          <Activities />
        </div>
      </div>
      <Footer />
    </>
  )
}
