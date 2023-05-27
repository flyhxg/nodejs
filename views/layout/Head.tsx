import NextHead from 'next/head'
import Script from 'next/script'

// const analyze = `
// <!-- Google tag (gtag.js) -->
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());
//
//   gtag('config', 'G-Z5DM24JKMG');
//
// `

export default function Head() {
  return (
    <>
      <NextHead>
        <title>Bananas - Bitcoin NFT Marketplace</title>
        <meta name="viewport" content="width=1400px, minimum-scale=0.1, maximum-scale=1, user-scalable=yes"></meta>
        <meta name="keywords" content="Bananas - Bitcoin NFT Marketplace" />
        <meta name="description" content="Bananas - Bitcoin NFT Marketplace" />
        <link rel={'canonical'} href={'/'} />
      </NextHead>
      {/*<Script src={'https://www.googletagmanager.com/gtag/js?id=G-Z5DM24JKMG'} />*/}
      {/*<Script dangerouslySetInnerHTML={{ __html: analyze }} />*/}
    </>
  )
}
