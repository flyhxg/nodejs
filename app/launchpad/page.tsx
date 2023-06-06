import s from './page.module.scss'
import Footer from '../views/footer'
import LaunchpadIntro from '../views/launchpad/LaunchpadIntro'
import { LaunchpadCard } from '../views/launchpad/LaunchpadCard'

export default function Page() {
  return (
    <>
      <div className={s.wrapper}>
        <LaunchpadIntro />
        <div className={s.cardList}>
          <LaunchpadCard />
          <LaunchpadCard />
          <LaunchpadCard />
          <LaunchpadCard />
          <LaunchpadCard />
        </div>
      </div>
      <Footer />
    </>
  )
}
