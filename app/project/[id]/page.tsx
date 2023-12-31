import s from './page.module.scss'
import ProjectInfo from './ProjectInfo'
import ItemList from './ItemList'
import { FilterContextProvider } from './FilterContext'
import { Services } from '../../../utils/http/Services'
import { notFound } from 'next/navigation'

export default async function Page(props: { params: { id: string } }) {
  const data = await Services.projectService.getCollectionDetail(+props.params.id, { cache: 'no-cache' })
  if (!data || data.id === 0) {
    notFound()
  }
  return (
    <div className={s.wrapper}>
      <ProjectInfo item={data} />
      <FilterContextProvider>
        <ItemList />
      </FilterContextProvider>
    </div>
  )
}
