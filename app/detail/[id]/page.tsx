import s from './page.module.scss'
import TxInfoBox from './TxInfoBox'
import AttrInfoBox from './AttrInfoBox'
import Activities from './Activities'
import Footer from '../../views/footer'
import { Services } from '../../../utils/http/Services'
import { getImageUri } from '../../../utils'
import { XImage } from '../../views/common/XImage'
import { notFound } from 'next/navigation'

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
            src={getImageUri(nftItem.contentURI, 500)}
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
