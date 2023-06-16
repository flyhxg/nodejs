import { useNow } from './useNow'
import { useEffect, useMemo } from 'react'

export enum Stage {
  NOT_START,
  STARTED,
  ENDED,
}

export function useStage(start: number, end: number): Stage {
  const { now, stop } = useNow()
  // 0 未开始 1 已开始未结束 2 已结束
  const stage = useMemo(
    () => (now < start ? Stage.NOT_START : now < end ? Stage.STARTED : Stage.ENDED),
    [now, start, end]
  )
  useEffect(() => {
    if (stage === Stage.ENDED) {
      stop()
    }
  }, [stage])
  return stage
}
