import Image from 'next/image'
import { Images } from '../../../utils/images'
import s from './group.module.scss'
import Link from 'next/link'

export default function Group(props: { title: string; type: string; item: GroupItem[] }) {
  return (
    <div className={s.groupWrapper}>
      {props.item.map((item, index) => (
        <Item key={index} type={props.type} item={item} />
      ))}
      {/*<Link href={`/${props.type}/6`}>*/}
      {/*  <Item status={Status.Live} />*/}
      {/*</Link>*/}
      {/*<Link href={`/${props.type}/2`}>*/}
      {/*  <Item status={Status.UpComing} />*/}
      {/*</Link>*/}
      {/*<Link href={`/${props.type}/3`}>*/}
      {/*  <Item status={Status.ComingSoon} />*/}
      {/*</Link>*/}
      {/*<Item status={Status.ComingSoon} />*/}

      {/*<Item status={Status.ComingSoon} />*/}

      {/*<Item status={Status.ComingSoon} />*/}

      <h3 className={s.groupTitle}>{props.title}</h3>
    </div>
  )
}

export interface GroupItem {
  name: string
  desc: string
  status: Status
  id: number
}

export enum Status {
  Live,
  UpComing,
  ComingSoon,
}

function Item(props: { item: GroupItem; type: string }) {
  const dom = (
    <div className={s.itemCard}>
      <div className={s.imageWrapper}>
        {props.item.status === Status.ComingSoon ? (
          <Image alt="Coming soon" src={Images.HOME.COOMING_SOON_SVG} width={100} height={34} />
        ) : (
          <Image alt="cover" src={Images.HOME.COVER_PNG} fill />
        )}
      </div>
      <div className={s.infoWrapper}>
        <h3>{props.item.name}</h3>
        <p>{props.item.desc}</p>
      </div>
      {props.item.status === Status.Live && <span className={s.status}>Live</span>}
      {props.item.status === Status.UpComing && <span className={s.status}>Up Coming</span>}
    </div>
  )
  if (props.item.status === Status.Live) {
    return <Link href={`/${props.type}/${props.item.id}`}>{dom}</Link>
  }
  return dom
}
