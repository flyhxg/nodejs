import s from './page.module.scss'
import ProjectInfo from './ProjectInfo'
export default function Page() {
  return (
    <div className={s.wrapper}>
      <ProjectInfo />
    </div>
  )
}
