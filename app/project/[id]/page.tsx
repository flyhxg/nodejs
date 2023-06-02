import s from './page.module.scss'
import ProjectInfo from './ProjectInfo'
import ItemList from './ItemList'
import { FilterContextProvider } from './FilterContext'

export default function Page() {
  return (
    <div className={s.wrapper}>
      <ProjectInfo />
      <FilterContextProvider>
        <ItemList />
      </FilterContextProvider>
    </div>
  )
}
