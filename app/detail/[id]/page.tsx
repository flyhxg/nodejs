import s from './page.module.scss'
import Image from 'next/image'
import { Images } from '../../../utils/images'
import TxInfoBox from './TxInfoBox'
import AttrInfoBox from './AttrInfoBox'
import Activities from './Activities'
import Footer from '../../views/footer'
export default function Page() {
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.left}>
          <Image src={Images.LAUNCHPAD.COVER_PNG} alt={'cover'} width={500} height={500} />
          <AttrInfoBox />
        </div>
        <div className={s.right}>
          <TxInfoBox />
          <Activities />
        </div>
      </div>
      <Footer />
    </>
  )
}
