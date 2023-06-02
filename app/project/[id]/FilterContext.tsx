'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { Display, Top } from '../../../utils/type'
import { NoOperation } from '../../../utils'

export const FilterContext = createContext<{
  top: Top
  onTopChange: (val: Top) => void
  display: Display
  onDisplayChange: (val: Display) => void
}>({
  top: Top.Top_1,
  onTopChange: NoOperation,
  display: Display.GRID,
  onDisplayChange: NoOperation,
})

export function FilterContextProvider(props: { children: ReactNode }) {
  const [top, setTop] = useState<Top>(Top.Top_1)
  const [display, setDisplay] = useState<Display>(Display.GRID)
  return (
    <FilterContext.Provider
      value={{
        top,
        display,
        onTopChange: setTop,
        onDisplayChange: setDisplay,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  )
}

export function useFilterContext() {
  return useContext(FilterContext)
}
