import s from './page.module.scss'
import Footer from '../views/footer'
import Collection from './Collection'

export default function Page() {
  return (
    <>
      <div className={s.wrapper}>
        <h3 className={s.title}>My Items</h3>
        <Collection />
      </div>
      <Footer />
    </>
  )
}
