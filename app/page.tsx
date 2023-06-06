import Image from 'next/image'
import { Images } from '../utils/images'
import s from './page.module.scss'
import Footer from './views/footer'
import Group from './views/home/group'
import { Metadata } from 'next'
export default function Page() {
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
          <Group title="LAUNCHPAD" type={'launchpad'} />
          <Group title="NEW COLLECTIONS" type={'project'} />
        </div>
      </div>
      <Footer />
    </>
  )
}
