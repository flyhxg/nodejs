import { notFound } from 'next/navigation'
import { getImageUri } from '../../../utils'
import { Services } from '../../../utils/http/Services'
import { XImage } from '../../views/common/XImage'
import Footer from '../../views/footer'
import Activities from './Activities'
import AttrInfoBox from './AttrInfoBox'
import TxInfoBox from './TxInfoBox'
import s from './page.module.scss'

export default async function Page(props: { params: { id: string } }) {
  const id = props.params.id
  const [nftItem, order] = await Promise.all([
    Services.marketService.getOrdItem(id, { cache: 'no-store' }),
    Services.marketService.orderDetail({ inscription_id: id }, { cache: 'no-store' }),
  ])
  if (!nftItem || !nftItem.owner) {
    notFound()
  }
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.left}>
          <XImage
            src={getImageUri(order.content_uri, 500)}
            alt={'cover'}
            style={{ width: 500, height: 500, display: 'inline-block' }}
          />
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
