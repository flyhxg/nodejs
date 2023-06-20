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
  const [nftItem, order] = await Promise.all([
    Services.marketService.getOrdItem(id, { cache: 'no-store' }),
    Services.marketService.orderDetail({ inscription_id: id }),
  ])
  console.log(nftItem, order)
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.left}>
          <Image src={Images.LAUNCHPAD.COVER_PNG} alt={'cover'} width={500} height={500} />
          <AttrInfoBox nftItem={nftItem} order={order} />
        </div>
        <div className={s.right}>
          <TxInfoBox nftItem={nftItem} />
          <Activities />
        </div>
      </div>
      <Footer />
    </>
  )
}
