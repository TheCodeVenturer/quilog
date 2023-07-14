import './globals.css'

import { Inter } from 'next/font/google'
import { NextAuthProvider } from './sessionProvider'
import { Toaster } from 'react-hot-toast'
import { StateContext } from './context/stateContext'

import { LayoutProvider } from './LayoutProvider'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-static'


export const metadata = {
  title: {
    template : "%s | Quilog",
    default: "Quilog"
  },
  description: `Quilog a blogger choice blogging app for your personal blog. Whether you're a travel enthusiast, a tech guru, a developer, or a fashion aficionado, QuiLog is the perfect platform to amplify your voice and share your expertise.`,
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>

      <body className={`${inter.className} box-border bg-[url('/Images/backGround.png')] bg-cover bg-opacity-50 bg-fixed bg-no-repeat h-[calc(100vh-20px)] m-0 p-0`} >
      
      <NextAuthProvider>
        <Toaster />
          <StateContext>
          <LayoutProvider>
            <main className='pt-[56px]'>{children}</main>
          </LayoutProvider>
          </StateContext>
        </NextAuthProvider>
      </body>
    </html>
  )
}
