'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { Images } from '../../../utils/images'
import { commonStyles } from '../../../utils/commonStyles'
import { XImage } from '../../views/common/XImage'
import { CollectionItem } from '../../../utils/http/Services/project'
import moment from 'moment'
import Link from 'next/link'
import { getImageUri } from '../../../utils'

export default function ProjectInfo(props: { item: CollectionItem }) {
  return (
    <Wrapper>
      <InfoWrapper>
        <Logo src={getImageUri(props.item.logo, 200)} />
        <InfoBox>
          <Title>
            {props.item.name} <AuthIcon />
          </Title>
          <ProjectDesc>
            {props.item.description}
            <More>
              More <DownIcon />
            </More>
          </ProjectDesc>
          <CreateAt>
            Create At <span>{moment.unix(props.item.create_time).format('YYYY.MM.DD')}</span>
          </CreateAt>
          <Datas>
            <DataItem>
              {props.item.holders}
              <br />
              <span>Holders</span>
            </DataItem>
            <DataItem>
              {props.item.total_supply}
              <br />
              <span>Total Supply</span>
            </DataItem>
          </Datas>
        </InfoBox>
      </InfoWrapper>
      <SocialList>
        <SocialItem src={Images.COMMON.LINK_SCAN_PNG} />
        {props.item.web_site && (
          <Link href={props.item.web_site} target={'_blank'}>
            <SocialItem src={Images.COMMON.LINK_WEBSITE_PNG} />
          </Link>
        )}
        {props.item.discord && (
          <Link href={props.item.discord} target={'_blank'}>
            <SocialItem src={Images.COMMON.LINK_DISCORD_PNG} />
          </Link>
        )}
        {props.item.twitter && (
          <Link href={props.item.twitter}>
            <SocialItem src={Images.COMMON.LINK_TWITTER_PNG} />
          </Link>
        )}
        {/*<SocialItem src={Images.COMMON.ICON_START_SVG} />*/}
        {/*<SocialItem src={Images.COMMON.ICON_SHARE_SVG} />*/}
        {/*<SocialItem src={Images.COMMON.ICON_MORE_SVG} />*/}
      </SocialList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 1720px;
  margin: 0 auto;
  height: 310px;
  position: relative;
`

const InfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`

const Logo = styled(XImage).attrs({
  width: 165,
  height: 165,
  alt: 'Logo',
})`
  width: 165px;
  height: 165px;
  margin-right: 40px;
`

const InfoBox = styled.div`
  padding-top: 20px;
`
const Title = styled.h3`
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  color: #ebebeb;
  ${commonStyles.flexStart}
`

const AuthIcon = styled(Image).attrs({
  width: 16,
  height: 16,
  src: Images.COMMON.AUTHED_SVG,
  alt: 'the project is authed',
})`
  width: 16px;
  height: 16px;
  margin-left: 20px;
`

const ProjectDesc = styled.p`
  font-size: 14px;
  color: #9e9e9e;
  line-height: 14px;
  margin-top: 20px;
  position: relative;
  max-width: 677px;
`

const More = styled.span`
  display: inline-block;
  margin-top: 8px;
  font-size: 16px;
  color: #9e9e9e;
  cursor: pointer;
  ${commonStyles.flexStart};
  position: absolute;
  bottom: -24px;
  left: 0;
`

const DownIcon = styled(Image).attrs({
  width: 7,
  height: 7,
  alt: 'angle',
  src: Images.COMMON.TRIANGLE_SVG,
})`
  width: 7px;
  height: 7px;
  margin-left: 6px;
`

const SocialList = styled.div`
  height: 18px;
  ${commonStyles.flexEnd};
  position: absolute;
  right: 0;
  top: -7px;
`

const SocialItem = styled(XImage)`
  height: 18px;
  margin-left: 17px;
  max-width: 20px;
  cursor: pointer;
`

const CreateAt = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: #9e9e9e;
  margin-top: 58px;
  span {
    color: #a9b0f8;
    margin-left: 15px;
  }
`

const Datas = styled.div`
  margin-top: 27px;
  ${commonStyles.flexStart};
`
const DataItem = styled.div`
  text-align: center;
  font-size: 22px;
  text-align: center;
  margin-right: 65px;
  color: #fff;
  line-height: 30px;
  span {
    font-size: 14px;
    line-height: 14px;
    margin-top: 11px;
    color: #9e9e9e;
  }
`
