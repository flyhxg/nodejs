import { useCallback, useEffect, useRef, useState } from 'react'
import { isBrowser } from '../utils/env'

//period 刷新时间间隔
export function useNow(period: number = 1000) {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000))
  const inter = useRef<number>(0)
  useEffect(() => {
    inter.current = window.setInterval(() => {
      setNow(Math.floor(Date.now() / 1000))
    }, period)
    return () => {
      window.clearInterval(inter.current)
    }
  }, [period])
  return {
    now,
    stop: useCallback(() => {
      isBrowser && window.clearInterval(inter.current)
    }, []),
  }
}
