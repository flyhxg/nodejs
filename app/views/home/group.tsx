import Image from 'next/image'
import { Images } from '../../../utils/images'
import s from './group.module.scss'
export default function Group(props: { title: string }) {
  return (
    <div className={s.groupWrapper}>
      <Item status={Status.Live} />
      <Item status={Status.UpComing} />
      <Item status={Status.ComingSoon} />
      <h3 className={s.groupTitle}>{props.title}</h3>
    </div>
  )
}

enum Status {
  Live,
  UpComing,
  ComingSoon,
}

function Item(props: { status: Status }) {
  return (
    <div className={s.itemCard}>
      <div className={s.imageWrapper}>
        {props.status === Status.ComingSoon ? (
          <Image alt="Coming soon" src={Images.HOME.COOMING_SOON_SVG} width={100} height={34} />
        ) : (
          <Image alt="cover" src={Images.HOME.COVER_PNG} fill />
        )}
      </div>
      <div className={s.infoWrapper}>
        <h3>Ordimon</h3>
        <p>View Collection</p>
      </div>
      {props.status === Status.Live && <span className={s.status}>Live</span>}
      {props.status === Status.UpComing && <span className={s.status}>Up Coming</span>}
    </div>
  )
}
