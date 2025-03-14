import type { Metadata } from 'next'
import './globals.css'
import { Header } from '../components/Header'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'A collection of categories',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='bg-black'>
        <Header />
        <div className='px-5 py-[120px] sm:px-10'>{children}</div>
      </body>
    </html>
  )
}
