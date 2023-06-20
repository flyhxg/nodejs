import Image from 'next/image'
import { Images } from '../../../utils/images'
import s from './group.module.scss'
import Link from 'next/link'
import { LaunchpadItem } from '../../../utils/http/Services/launchpad'
import { XImage } from '../common/XImage'
import { getImageUri } from '../../../utils'

export function LaunchpadGroup(props: { title: string; items: LaunchpadItem[] }) {
  const emptyPad = 3 - props.items.length
  let empty: GroupItem[] = []
  if (emptyPad > 0) {
    empty = new Array(emptyPad).fill({
      name: '',
      desc: '',
      status: Status.ComingSoon,
      id: '',
    })
  }
  return (
    <div className={s.groupWrapper}>
      {props.items.map((item, index) => (
        <Item
          key={index}
          type={'launchpad'}
          item={{
            name: item.name,
            desc: item.description,
            status: Status.Live,
            id: item.id,
            logo: getImageUri(item.logo),
          }}
        />
      ))}
      {empty.map((item, index) => (
        <Item
          key={index + 'i'}
          type={'launchpad'}
          item={{
            name: item.name,
            desc: item.desc,
            status: item.status,
            id: item.id,
            logo: '',
          }}
        />
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

export function CollectionGroup(props: { title: string; type: string; items: GroupItem[] }) {
  const emptyPad = 3 - props.items.length
  let empty: GroupItem[] = []
  if (emptyPad > 0) {
    empty = new Array(emptyPad).fill({
      name: '',
      desc: '',
      status: Status.ComingSoon,
      id: 3,
      logo: '',
    })
  }
  return (
    <div className={s.groupWrapper}>
      {props.items.map((item, index) => (
        <Item key={index} type={props.type} item={item} />
      ))}
      {empty.map((item, index) => (
        <Item
          key={index + 'i'}
          type={props.type}
          item={{
            name: item.name,
            desc: item.desc,
            status: item.status,
            id: item.id,
            logo: '',
          }}
        />
      ))}

      <h3 className={s.groupTitle}>{props.title}</h3>
    </div>
  )
}

export interface GroupItem {
  name: string
  desc: string
  status: Status
  id: number
  logo: string
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
          <XImage alt="Coming soon" src={Images.HOME.COOMING_SOON_SVG} />
        ) : (
          <XImage className={s.image} alt="cover" src={props.item.logo} />
        )}
      </div>
      <div className={s.infoWrapper}>
        <h3>{props.item.name}</h3>
        {props.type !== 'launchpad' && <p>{props.item.desc}</p>}
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
