import Image from 'next/image'
import { Images } from '../utils/images'
import s from './page.module.scss'
import Footer from './views/footer'
import { CollectionGroup, GroupItem, LaunchpadGroup, Status } from './views/home/group'
import { Services } from '../utils/http/Services'

const launchpad: GroupItem[] = [
  {
    name: 'Ordimon',
    desc: 'View Collection',
    status: Status.Live,
    id: 6,
  },
  {
    name: 'Ordimon',
    desc: 'View Collection',
    status: Status.Live,
    id: 7,
  },
  {
    name: '',
    desc: '',
    status: Status.ComingSoon,
    id: 3,
  },
]

export default async function Page() {
  const { items } = await Services.launchpadService.getLaunchpadList({ pageNo: 1, pageSize: 10 })
  return (
    <>
      <div className={s.pageWrapper}>
        <div className={s.contentWrapper}>
          <div className={s.personWrapper}>
            <Image alt="Person" className={s.person} src={Images.HOME.PERSON_PNG} fill />
          </div>
          <div className={s.text}>
            <h3>bitcoins go bananas!</h3>
            <p>
              Welcome To Our Monkey Business!
              <br />
              Trade Bananas Earn Bitcoins.
            </p>
          </div>
          <Image alt="btc" src={Images.HOME.BTC_PNG} width={65} height={65} className={s.btc} />
          <Image alt="btc1" src={Images.HOME.BTC_PNG} width={65} height={65} className={s.btc1} />
        </div>
        <div className={s.padsWrapper}>
          <LaunchpadGroup title="LAUNCHPAD" items={items} />
          <CollectionGroup title="NEW COLLECTIONS" type={'project'} item={launchpad} />
        </div>
      </div>
      <Footer />
    </>
  )
}
