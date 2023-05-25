import '../styles/globals.css'
import { Metadata } from 'next'

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export const metadata: Metadata = {
  title: 'Bananas - Bitcoin NFT Marketplace',
  description: 'Bananas - Bitcoin NFT Marketplace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
