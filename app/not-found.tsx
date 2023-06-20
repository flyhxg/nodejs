'use client'
import styled from 'styled-components'
import { commonStyles } from '../utils/commonStyles'
import { XImage } from './views/common/XImage'
import { Images } from '../utils/images'
import Footer from './views/footer'

export default function Error404() {
  return (
    <>
      <PageWrapper>
        <StyleImage />
      </PageWrapper>
      <Footer />
    </>
  )
}

const PageWrapper = styled.div`
  height: calc(100vh - 230px);
  ${commonStyles.flexCenter};
`

const StyleImage = styled(XImage).attrs({
  src: Images.COMMON.NOTFOUND_SVG,
})`
  width: 206px;
  height: 291px;
  display: inline-block;
`
