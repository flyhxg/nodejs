import s from './ComingSoon.module.scss'
import { CSSProperties } from 'react'

export default function ComingSoon(props: { className?: string; style?: CSSProperties }) {
  return (
    <div className={s.comingWrapper + ' ' + props.className} style={props.style}>
      Coming Soon
    </div>
  )
}
