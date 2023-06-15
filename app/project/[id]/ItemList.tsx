'use client'
import styled, { css } from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import { XButton } from '../../views/common/XButton'
import { Images } from '../../../utils/images'
import Image from 'next/image'
import { Display, Top } from '../../../utils/type'
import { useFilterContext } from './FilterContext'
import ItemCard from './ItemCard'
import { LoadingFrame } from '../../views/common/Loading'
import Empty from '../../views/common/Empty'
import Table, { TableColumn } from '../../views/table/Table'
import { OrderItem } from '../../../utils/http/Services/project'
import { columns } from './TableList'

export default function ItemList() {
  const { orders, isLoading, display } = useFilterContext()
  const isEmpty = orders.length === 0 && !isLoading
  return (
    <ItemListWrapper>
      <ToolBar />
      {isEmpty ? (
        <Empty top={150} />
      ) : isLoading ? (
        <StyledLoadingFrame size={40} />
      ) : (
        <>
          {display === Display.LIST && !isLoading && <Table data={orders} columns={columns} />}
          {display === Display.GRID && !isLoading && (
            <ListWrapper>
              {orders.map((order) => (
                <ItemCard order={order} key={order.order_id} />
              ))}
            </ListWrapper>
          )}
          {isLoading && <StyledLoadingFrame size={40} />}
        </>
      )}
    </ItemListWrapper>
  )
}

const StyledLoadingFrame = styled(LoadingFrame)`
  width: 260px;
  height: 335px;
`

const ItemListWrapper = styled.div`
  margin: 70px auto 0 auto;
  max-width: 1640px;
  position: relative;
`

function ToolBar() {
  const { top, onTopChange, display, onDisplayChange } = useFilterContext()
  return (
    <BarWrapper>
      <TopSelector>
        <SelectorItem isSelected={top === Top.Top_1} onClick={() => onTopChange(Top.Top_1)}>
          Top 1%
        </SelectorItem>
        <SelectorItem isSelected={top === Top.TOP_10} onClick={() => onTopChange(Top.TOP_10)}>
          Top 10%
        </SelectorItem>
        <SelectorItem isSelected={top === Top.TOP_25} onClick={() => onTopChange(Top.TOP_25)}>
          Top 25%
        </SelectorItem>
      </TopSelector>
      <DisplaySelector>
        <DisplayItem
          onClick={() => onDisplayChange(Display.GRID)}
          isSelected={display === Display.GRID}
          selectedIcon={Images.COMMON.DISPLAY_GRID_ACTIVE_SVG}
          icon={Images.COMMON.DISPLAY_GRID_SVG}
        />
        <DisplayItem
          onClick={() => onDisplayChange(Display.LIST)}
          isSelected={display === Display.LIST}
          selectedIcon={Images.COMMON.DISPLAY_LIST_ACTIVE_SVG}
          icon={Images.COMMON.DISPLAY_LIST_SVG}
        />
      </DisplaySelector>
    </BarWrapper>
  )
}

const BarWrapper = styled.div`
  ${commonStyles.flexBetween}
`

const TopSelector = styled.div`
  ${commonStyles.flexStart};
  height: 40px;
`
const SelectorItem = styled(XButton)<{ isSelected?: boolean }>`
  width: 95px;
  margin-right: 5px;
  ${(props) =>
    props.isSelected
      ? ''
      : css`
          color: #9e9e9e;
          background: #222222;
        `}
`

const DisplaySelector = styled.div`
  ${commonStyles.flexEnd};
`

function DisplayItem(props: { icon: string; selectedIcon: string; isSelected?: boolean; onClick: () => void }) {
  return (
    <DisplayItemButton isSelected={props.isSelected} onClick={props.onClick}>
      <Icon src={props.isSelected ? props.selectedIcon : props.icon} />
    </DisplayItemButton>
  )
}

const DisplayItemButton = styled(XButton)<{ isSelected?: boolean }>`
  width: 40px;
  margin-left: 10px;
  ${(props) =>
    props.isSelected
      ? ''
      : css`
          color: #9e9e9e;
          background: #2e2e2e;
        `}
`

const Icon = styled(Image).attrs({
  width: 20,
  height: 20,
  alt: 'icon',
})`
  width: 20px;
  height: 20px;
`

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-template-rows: repeat(auto-fill, 335px);
  grid-gap: 19px 15px;
`
