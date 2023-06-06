import '../styles/globals.css'
import { pixelFont } from '../utils/font'
import DialogProvider from './context/DialogContext'
import StyledComponentsRegistry from './views/common/registry'
import Header from './views/header/header'
import ModalContextProvider from './context/ModalContext'
import '../styles/nprogress.css'
import WalletContextProvider from './context/WalletContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Banana Market',
  description: 'Buy and Sale NFT on btc network',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pixelFont.className}>
      <body>
        {/*<NProgress />*/}
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
      </body>
    </html>
  )
}
