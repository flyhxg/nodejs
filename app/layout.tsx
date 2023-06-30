import '../styles/globals.css'
import { pixelFont } from '../utils/font'
import DialogProvider from './context/DialogContext'
import StyledComponentsRegistry from './views/common/registry'
import Header from './views/header/header'
import ModalContextProvider from './context/ModalContext'
import '../styles/nprogress.css'
import WalletContextProvider from './context/WalletContext'
import { Metadata } from 'next'
import Script from 'next/script'
import NProgressBar from './views/common/NProgressBar'
import GoogleAnalyze from './views/common/GoogleAnalyze'

export const metadata: Metadata = {
  title: 'Banana Market',
  description: 'Buy and Sale NFT on btc network',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pixelFont.className}>
      <head>
        <Script src={'/js/mempool.js'} strategy={'beforeInteractive'} />
        <GoogleAnalyze id={'G-XKJRE222G9'} />
      </head>
      <body>
        <StyledComponentsRegistry>
          <WalletContextProvider>
            <DialogProvider>
              <ModalContextProvider>
                <Header />
                {children}
              </ModalContextProvider>
            </DialogProvider>
          </WalletContextProvider>
        </StyledComponentsRegistry>
        <NProgressBar />
      </body>
    </html>
  )
}
