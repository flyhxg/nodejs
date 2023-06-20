import { TableColumn } from '../../views/table/Table'
import { OrderItem } from '../../../utils/http/Services/project'
import styled from 'styled-components'
import { XImage } from '../../views/common/XImage'
import { Images } from '../../../utils/images'
import { formatSat } from '../../../utils'
import { commonStyles } from '../../../utils/commonStyles'
import Image from 'next/image'
import Loading from '../../views/common/Loading'
import { OrderStatus } from '../../../utils/type'
import AddressLink from '../../views/common/AddressLink'
import moment from 'moment'

export const columns: TableColumn<OrderItem>[] = [
  {
    name: 'Item',
    render: (data) => (
      <>
        <ImageIcon src={Images.HOME.COVER_PNG} />
        <Name>{data.name}</Name>
        {data.order_status === OrderStatus.Pending && <StyledLoading />}
      </>
    ),
  },
  {
    name: 'Rarity',
    render: () => <>3844</>,
  },
  {
    name: 'Price',
    render: (data) => (
      <InfoPrice>
        <BtcIcon />
        {formatSat(data.price)} BTC
      </InfoPrice>
    ),
  },
  {
    name: 'Last Sale',
    render: (data) => (
      <InfoPrice>
        <BtcIcon />
        {formatSat(data.last_sale_price)} BTC
      </InfoPrice>
    ),
  },
  {
    name: 'Owner',
    render: (data) => <AddressLink style={{ color: '#FFF' }} addr={data.owner} shorten={10} />,
  },
  {
    name: 'Listed',
    render: (data) => <>{moment.unix(data.listing_time).fromNow()}</>,
  },
]

const ImageIcon = styled(XImage)`
  width: 30px;
  height: 30px;
  margin-right: 9px;
`
const Name = styled.span`
  font-size: 14px;
  line-height: 14px;
  color: #efefef;
`

const InfoTitle = styled.h3`
  font-size: 16px;
  color: #efefef;
  line-height: 16px;
`

const InfoPrice = styled(InfoTitle)`
  margin-top: 15px;
  ${commonStyles.flexStart};
  padding-left: 17px;
`

const BtcIcon = styled(Image).attrs({
  src: Images.COMMON.LOGO_BTC_SVG,
  width: 15,
  height: 15,
  alt: 'btc',
})`
  width: 15px;
  height: 15px;
  margin-right: 6px;
`

const StyledLoading = styled(Loading).attrs({
  size: 20,
})`
  position: absolute;
  left: 30px;
  top: 5px;
`
