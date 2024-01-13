import { Inter } from 'next/font/google'
import './globals.css'
import Authprovider from '@/components/Authprovider/Authprovider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <Authprovider>
      {children}
      </Authprovider>
     
      </body>

    </html>
  )
}

