import s from './page.module.scss'
import Footer from '../views/footer'
import ItemCard from '../views/my/ItemCard'

export default function Page() {
  return (
    <>
      <div className={s.wrapper}>
        <h3 className={s.title}>My Items</h3>
        <div className={s.itemsList}>
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
      <Footer />
    </>
  )
}
