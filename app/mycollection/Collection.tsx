'use client'
import styled from 'styled-components'
import ItemCard from '../views/my/ItemCard'
import useWindowInfiniteScroll from '../../hooks/useWindowInfiniteScroll'
import { I, isNoMore } from '../../utils/http/infinite'
import { Services } from '../../utils/http/Services'
import { useWallet } from '../context/WalletContext'
import { commonStyles } from '../../utils/commonStyles'
import Loading from '../views/common/Loading'
import Empty from '../views/common/Empty'

export default function Collection() {
  const { active, account } = useWallet()
  const { data, loading, loadingMore, mutate } = useWindowInfiniteScroll(
    I(Services.userService.myNftList, {
      currAddr: account as string,
      limit: 10,
    }),
    {
      reloadDeps: [account],
      isNoMore: isNoMore,
      ready: !!account,
    }
  )

  const list = data?.list || []
  const isLoading = loading || loadingMore
  const isEmpty = !isLoading && list.length === 0
  return isEmpty ? (
    <Empty top={150} />
  ) : (
    <CollectionWrapper>
      {list.map((x) => (
        <ItemCard
          onListed={() => {
            //@ts-ignore
            mutate((data) => {
              const target = (data?.list || []).find((y) => y.id === x.id)
              if (target) {
                target.listed = true
              }
              return { ...data }
            })
          }}
          item={x}
          key={x.id}
        />
      ))}
      {(loading || loadingMore) && (
        <LoadingWrapper>
          <Loading size={50} />
        </LoadingWrapper>
      )}
    </CollectionWrapper>
  )
}

const LoadingWrapper = styled.div`
  ${commonStyles.flexCenter};
  position: relative;
`

const CollectionWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-template-rows: repeat(auto-fill, 335px);
  //grid-auto-flow: dense column;
  margin-top: 50px;
  grid-gap: 22px;
  padding-bottom: 100px;
`
