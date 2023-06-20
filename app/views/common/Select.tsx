import styled from 'styled-components'
import { CSSProperties, useMemo } from 'react'
import { commonStyles } from '../../../utils/commonStyles'

export function Select<T>(props: {
  selections: SelectionItem<T>[]
  value: T
  onChange: (v: T) => void
  className?: string
  style?: CSSProperties
  placeHolder?: string
}) {
  const target = useMemo(() => props.selections.find((x) => x.value === props.value), [props.selections, props.value])
  return (
    <SelectWrapper className={props.className} style={props.style}>
      <span>{target?.label || props.placeHolder || 'Select ...'}</span>
      <SelectItemsWrapper>
        {props.selections.map((selection) => (
          <SelectItem
            key={selection.label}
            selected={selection.value === props.value}
            onClick={() => props.onChange(selection.value)}
          >
            {selection.label}
          </SelectItem>
        ))}
      </SelectItemsWrapper>
    </SelectWrapper>
  )
}
export interface SelectionItem<T> {
  label: string
  value: T
}

const SelectWrapper = styled.div`
  width: 236px;
  height: 40px;
  background: #2e2e2e;
  position: relative;
  ${commonStyles.flexBetween};
  padding: 0 25px;
  cursor: pointer;
  font-size: 14px;
  line-height: 40px;
  color: #9e9e9e;
`

const SelectItemsWrapper = styled.div`
  ${SelectWrapper}:hover > & {
    opacity: 1;
    visibility: visible;
  }
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s linear;
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  background: #1c1c1c;
`

const SelectItem = styled.div<{ selected?: boolean }>`
  height: 50px;
  background: #1c1c1c;
  cursor: pointer;
  padding: 0 25px;
  font-size: 16px;
  color: #efefef;
  line-height: 50px;
  background: ${(props) => (props.selected ? '#343434' : '#1c1c1c')};
  &:hover {
    background: #343434;
  }
`
