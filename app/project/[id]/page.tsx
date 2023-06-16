import s from './page.module.scss'
import ProjectInfo from './ProjectInfo'
import ItemList from './ItemList'
import { FilterContextProvider } from './FilterContext'
import { Services } from '../../../utils/http/Services'

export default async function Page(props: { params: { id: string } }) {
  const data = await Services.projectService.getCollectionDetail(+props.params.id)
  return (
    <div className={s.wrapper}>
      <ProjectInfo item={data} />
      <FilterContextProvider>
        <ItemList />
      </FilterContextProvider>
    </div>
  )
}
