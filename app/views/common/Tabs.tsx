'use client'
import { createContext, CSSProperties, ReactElement, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { NoOperation } from '../../../utils'
import { commonStyles } from '../../../utils/commonStyles'

const TabContext = createContext<{
  current: number
  onChange?: (val: number) => void
  tabNames: string[]
}>({
  current: 0,
  onChange: NoOperation,
  tabNames: [],
})

export default function Tabs(props: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  defaultActiveIndex?: number
}) {
  const names = (props.children as ReactElement[]).map((x) => x.props.name)
  const [current, setCurrent] = useState(props.defaultActiveIndex || 0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    //@ts-ignore
    setWidth(ref.current.children[current].clientWidth)
    //@ts-ignore
    setLeft(ref.current.children[current].offsetLeft)
  }, [current])
  return (
    <TabContext.Provider value={{ current, onChange: setCurrent, tabNames: names }}>
      <TabsWrapper className={props.className} style={props.style}>
        <TabTapList left={left} width={width} ref={ref}>
          {names.map((name, index) => (
            <TabTapItem key={name} onClick={() => setCurrent(index)}>
              {name}
            </TabTapItem>
          ))}
        </TabTapList>
        {props.children}
      </TabsWrapper>
    </TabContext.Provider>
  )
}

const TabsWrapper = styled.div`
  position: relative;
`

export function TabItem(props: { name: string; children?: ReactNode }) {
  const { current, tabNames } = useContext(TabContext)
  const index = tabNames.indexOf(props.name)
  return <>{index === current ? props.children : null}</>
}

const TabTapList = styled.div<{ left: number; width: number }>`
  height: 30px;
  ${commonStyles.flexStart};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 2px;
    width: ${(props) => props.width}px;
    left: ${(props) => props.left}px;
    background-color: #f5d802;
    bottom: 0;
    transition: all 0.2s linear;
  }
`
const TabTapItem = styled.span`
  height: 30px;
  display: inline-block;
  line-height: 30px;
  font-size: 16px;
  color: #fff;
  padding: 0 30px;
  cursor: pointer;
  margin-right: 50px;
`
