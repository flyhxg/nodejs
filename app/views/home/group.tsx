import Image from 'next/image'
import { Images } from '../../../utils/images'
import s from './group.module.scss'
import Link from 'next/link'

export default function Group(props: { title: string; type: string }) {
  return (
    <div className={s.groupWrapper}>
      <Link href={`/${props.type}/1`}>
        <Item status={Status.Live} />
      </Link>
      <Link href={`/${props.type}/2`}>
        <Item status={Status.UpComing} />
      </Link>
      <Link href={`/${props.type}/3`}>
        <Item status={Status.ComingSoon} />
      </Link>
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
