'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { Display, Top } from '../../../utils/type'
import { NoOperation } from '../../../utils'
import { OrderItem } from '../../../utils/http/Services/project'
import useWindowInfiniteScroll from '../../../hooks/useWindowInfiniteScroll'
import { I, isNoMore } from '../../../utils/http/infinite'
import { Services } from '../../../utils/http/Services'
import { useParams, useSearchParams } from 'next/navigation'

export const FilterContext = createContext<{
  top: Top
  onTopChange: (val: Top) => void
  display: Display
  onDisplayChange: (val: Display) => void
  orders: OrderItem[]
  isLoading: boolean
}>({
  top: Top.Top_1,
  onTopChange: NoOperation,
  display: Display.GRID,
  onDisplayChange: NoOperation,
  orders: [],
  isLoading: false,
})

export function FilterContextProvider(props: { children: ReactNode }) {
  const params = useParams()
  const [top, setTop] = useState<Top>(Top.Top_1)
  const [display, setDisplay] = useState<Display>(Display.GRID)
  const { data, loadingMore, loading } = useWindowInfiniteScroll(
    I(Services.projectService.orderList, { limit: 20, top, collection_id: +params.id }),
    {
      reloadDeps: [top],
      isNoMore,
    }
  )
  const orders = data?.list || []
  const isLoading = loading || loadingMore
  return (
    <FilterContext.Provider
      value={{
        top,
        display,
        onTopChange: setTop,
        onDisplayChange: setDisplay,
        orders,
        isLoading,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  )
}

export function useFilterContext() {
  return useContext(FilterContext)
}
