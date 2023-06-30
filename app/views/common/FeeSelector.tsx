import styled, { css } from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import { CSSProperties, useEffect, useState } from 'react'
import { mempool } from '../../../utils/mempool'
import { useRequest } from 'ahooks'
import { Services } from '../../../utils/http/Services'
import R from '../../../utils/http/request'
import BigNumber from 'bignumber.js'

interface FeeSelectItem {
  label: string
  value: number
}

export default function FeeSelector(props: {
  className?: string
  style?: CSSProperties
  onChange: (value: number) => void
}) {
  const [fees, setFees] = useState<FeeSelectItem[]>([])
  const [selected, setSelected] = useState<FeeSelectItem | null>(null)
  const { data } = useRequest(R(Services.marketService.getUsdRate, { coin_id: 'bitcoin' }))
  const rate = data?.price || 0
  useEffect(() => {
    const { bitcoin } = mempool()
    bitcoin.fees.getFeesRecommended().then((res) => {
      const _fees = [
        {
          label: 'Low',
          value: res.minimumFee,
        },
        {
          label: 'Medium',
          value: res.hourFee,
        },
        {
          label: 'High',
          value: res.fastestFee,
        },
      ]
      setFees(_fees)
      setSelected(_fees[0])
    })
  }, [])
  useEffect(() => {
    props.onChange(selected?.value || 0)
  }, [selected])
  return (
    <SelectWrapper>
      {fees.map((fee) => (
        <SelectItem key={fee.label} selected={fee === selected} onClick={() => setSelected(fee)}>
          <span>{fee.label}</span>
          <span>
            {fee.value} Sats/VB ~${calPrice(10000, rate)}
          </span>
        </SelectItem>
      ))}
    </SelectWrapper>
  )
}

function calPrice(sat: number, rate: number) {
  return ((rate / 100_000_000) * sat).toFixed(2)
}

const SelectWrapper = styled.div`
  height: 42px;
  ${commonStyles.flexBetween};
`

const SelectItem = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  width: 194px;
  height: 42px;
  border: 1px solid #4d4d4d;
  transition: all 0.2s linear;
  margin-top: 17px;
  padding-top: 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-right: 9px;
  &:last-child {
    margin-right: 0;
  }
  span:first-child {
    font-size: 14px;
    color: #efefef;
    line-height: 14px;
    text-align: center;
  }
  span:last-child {
    font-size: 12px;
    color: #9e9e9e;
    line-height: 12px;
    margin-top: 3px;
    text-align: center;
  }
  &:hover {
    border: 1px solid #f5d802;
  }
  ${(props) =>
    props.selected
      ? css`
          border: 1px solid #f5d802;
        `
      : ''}
`
