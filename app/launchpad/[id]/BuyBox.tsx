'use client'
import styled, { css } from 'styled-components'
import { commonStyles } from '../../../utils/commonStyles'
import Image from 'next/image'
import { XButton } from '../../views/common/XButton'
import { Images } from '../../../utils/images'
import { LaunchpadItem } from '../../../utils/http/Services/launchpad'
import { formatSat, shortenHash } from '../../../utils'
import { Stage, useStage } from '../../../hooks/useStage'
import moment from 'moment'
import { durationTime } from '../../../utils/time'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import { useWallet } from '../../context/WalletContext'
import R from '../../../utils/http/request'
import { Services } from '../../../utils/http/Services'
import { BuyLoadingStage } from '../../../hooks/useBuyPsbt'
import useBuyLaunchpad from '../../../hooks/useBuyLaunchpad'
import { OrderStatus } from '../../../utils/type'
import { useRouter, useSearchParams } from 'next/navigation'
import FeeSelector from '../../views/common/FeeSelector'

enum BuyType {
  Private,
  Public,
  None,
}

export default function BuyBox(props: { item: LaunchpadItem }) {
  console.log('props', props)

  const searchParams = useSearchParams()
  const _type = searchParams.get('type')
  const { account } = useWallet()
  const { data: launchpadStatus, refresh } = useRequest(
    //@ts-ignore
    R(Services.launchpadService.getLaunchpadStatus, { lanchpadId: props.item.id, address: account }),
    {
      refreshDeps: [account],
      ready: !!account,
    }
  )
  const { data: launchpadItem } = useRequest(R(Services.launchpadService.getRandomLaunchpadItem, props.item.id), {
    refreshDeps: [account],
  })
  const { data: ordItem } = useRequest(R(Services.marketService.getOrdItem, launchpadItem?.inscriptionId || ''), {
    ready: !!launchpadItem,
  })

  const privateStage = useStage(props.item.privateStartTime, props.item.privateEndTime)
  const publicStage = useStage(props.item.publicStartTime, props.item.publicEndTime)
  const privatePending = (launchpadStatus?.privatePendings || [])[0]?.status === OrderStatus.Pending
  const publicPending = (launchpadStatus?.publicPendings || [])[0]?.status === OrderStatus.Pending
  const privateBuyed = (launchpadStatus?.privatePendings || [])[0]?.status === OrderStatus.Success
  const publicBuyed = (launchpadStatus?.publicPendings || [])[0]?.status === OrderStatus.Success
  const isPrivateEnd = privateStage === Stage.ENDED || props.item.privateLimit <= 0
  const isPublicEnd = publicStage === Stage.ENDED || props.item.publicLimit <= 0
  const privatPendingHash = (launchpadStatus?.privatePendings || [])[0]?.txHash
  const publicPendingHash = (launchpadStatus?.publicPendings || [])[0]?.txHash

  const canPrivate =
    launchpadStatus?.hasWhiteList &&
    launchpadStatus.whiteListValid &&
    !privatePending &&
    !isPrivateEnd &&
    privateStage === Stage.STARTED
  const canPublic = launchpadStatus?.publicValid && !publicPending && !isPublicEnd && publicStage === Stage.STARTED

  let defaultType = privateStage === Stage.STARTED ? BuyType.Private : BuyType.Public
  if (_type === 'public') defaultType = BuyType.Public
  if (_type === 'private') defaultType = BuyType.Private
  const [type, setType] = useState<BuyType>(defaultType)
  const showCheck = (type === BuyType.Private && privateBuyed) || (type === BuyType.Public && publicBuyed)
  const [fee, setFee] = useState(0)

  const { buyPsbt, loading, loadingTx } = useBuyLaunchpad(
    fee,
    ordItem,
    type === BuyType.Private ? props.item.privatePrice : props.item.publicPrice
  )

  const now = moment().unix()
  const router = useRouter()

  return (
    <BoxWrapper>
      <OrderItem active={type === BuyType.Private} onClick={() => setType(BuyType.Private)}>
        <Status active={type === BuyType.Private} />
        <PriceItem>
          <BtcIcon /> {formatSat(props.item.privatePrice)} BTC
        </PriceItem>
        {privateStage === Stage.NOT_START && (
          <OrderTime>Start In: {durationTime(props.item.privateStartTime - now)}</OrderTime>
        )}
        {privateStage === Stage.STARTED && !isPrivateEnd && (
          <OrderTime>End In {durationTime(props.item.privateEndTime - now)}</OrderTime>
        )}
        {isPrivateEnd && <OrderTime>Ended</OrderTime>}
      </OrderItem>
      <OrderItem active={type === BuyType.Public} onClick={() => setType(BuyType.Public)}>
        <Status isPublic active={type === BuyType.Public} />
        <PriceItem>
          <BtcIcon /> {formatSat(props.item.publicPrice)} BTC
        </PriceItem>
        {publicStage === Stage.NOT_START && (
          <OrderTime>Start In: {durationTime(props.item.publicStartTime - now)}</OrderTime>
        )}
        {publicStage === Stage.STARTED && !isPublicEnd && (
          <OrderTime>End In {durationTime(props.item.publicEndTime - now)}</OrderTime>
        )}
        {isPublicEnd && <OrderTime>Ended</OrderTime>}
      </OrderItem>
      <FeeSelector onChange={setFee} />
      <ButtonGroups>
        {showCheck ? (
          <StyledButton
            onClick={() => {
              router.push(`/mycollection`)
            }}
          >
            Check NFT
          </StyledButton>
        ) : (
          <StyledButton
            loadingText={
              (type === BuyType.Private && privatePending) || (type === BuyType.Public && publicPending)
                ? `Transaction is confirming...${shortenHash(
                    type === BuyType.Private ? privatPendingHash : publicPendingHash
                  )}`
                : ''
            }
            isLoading={
              (loading !== BuyLoadingStage.NotStart && loading !== BuyLoadingStage.Done) ||
              (type === BuyType.Private && privatePending) ||
              (type === BuyType.Public && publicPending)
            }
            disabled={
              type === BuyType.None ||
              (type === BuyType.Private && !canPrivate) ||
              (type === BuyType.Public && !canPublic)
            }
            onClick={async () => {
              const result = await buyPsbt(props.item.id, type === BuyType.Private)
              if (result)
                !!result &&
                  router.replace(`${location.pathname}?type=${type === BuyType.Public ? 'public' : 'private'}`)
            }}
          >
            Buy
          </StyledButton>
        )}
      </ButtonGroups>
    </BoxWrapper>
  )
}

const BoxWrapper = styled.div`
  width: 577px;
  margin-top: 44px;
  position: relative;
`

const OrderItem = styled.div<{ active?: boolean }>`
  height: 89px;
  background: #2e2e2e;
  padding-top: 10px;
  padding-left: 18px;
  position: relative;
  margin-bottom: 10px;
  transition: border-color 0.2s linear;
  cursor: pointer;
  border: 2px solid transparent;
  ${(props) =>
    props.active
      ? css`
          border-color: #f5d802;
        `
      : ''}
`

const Status = styled.span.attrs((props) => ({
  // @ts-ignore
  children: props.isPublic ? 'Public' : 'Private',
}))<{ isPublic?: boolean; active?: boolean }>`
  height: 20px;
  padding: 0 10px;
  background: ${(props) => (props.active ? '#F5D802' : '#818181')};
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  color: #0f0f0f;
  display: inline-block;
`

const PriceItem = styled.p`
  height: 18px;
  ${commonStyles.flexStart};
  margin-top: 20px;
  font-size: 18px;
  line-height: 18px;
  color: #fff;
`
const BtcIcon = styled(Image).attrs({
  width: 15,
  height: 15,
  alt: 'btc logo',
  src: Images.COMMON.LOGO_BTC_SVG,
})`
  width: 15px;
  height: 15px;
  margin-right: 13px;
`

const ButtonGroups = styled.div`
  height: 40px;
  ${commonStyles.flexBetween};
  margin-top: 17px;
`

const StyledButton = styled(XButton)`
  width: 284px;
  width: 100%;
`

const OrderTime = styled.span`
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  color: #9e9e9e;
  position: absolute;
  top: 12px;
  right: 23px;
`
