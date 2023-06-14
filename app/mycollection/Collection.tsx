'use client'
import styled from 'styled-components'
import ItemCard from '../views/my/ItemCard'
import useWindowInfiniteScroll from '../../hooks/useWindowInfiniteScroll'
import { I, isNoMore } from '../../utils/http/infinite'
import { Services } from '../../utils/http/Services'
import { useWallet } from '../context/WalletContext'
import { commonStyles } from '../../utils/commonStyles'
import Loading from '../views/common/Loading'

export default function Collection() {
  const { active, account } = useWallet()
  const { data, loading, loadingMore } = useWindowInfiniteScroll(
    I(Services.userService.myNftList, {
      currAddr: 'bc1p6a48kt60lzd3rtudetmcky2eq3qtqn9yd3myx833hngs8udeve6s0yxxky',
      limit: 10,
    }),
    {
      reloadDeps: [account],
      isNoMore: isNoMore,
    }
  )

  const list = data?.list || []
  console.log(loading, loadingMore, list)
  return (
    <CollectionWrapper>
      {list.map((x) => (
        <ItemCard item={x} key={x.id} />
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
