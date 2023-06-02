import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import { isBrowser } from '../utils/env'

if (isBrowser) {
  //@ts-ignore
  window.navigation.onnavigatesuccess = () => {
    NProgress.done()
  }
  window.addEventListener('load', () => {
    NProgress.done()
  })
}

export default function useRouteProgress() {
  const params = useParams()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.start()
  }, [params, searchParams])
}
