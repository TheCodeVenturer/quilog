import './globals.css'

import db from '@/lib/db'

import { NextAuthProvider } from './sessionProvider'
import { Toaster } from 'react-hot-toast'
import { StateContext } from './context/stateContext'

import { LayoutProvider } from './LayoutProvider'




import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({ subsets: ['latin']})


export async function generateMetadata(){
  await db.connect()
  return {
    metadataBase: new URL(`https://quilog.vercel.app/`),
    title: {
      template : "%s | Quilog",
      default: "Quilog"
    },
    description: `Quilog a blogger choice blogging app for your personal blog. Whether you're a travel enthusiast, a tech guru, a developer, or a fashion aficionado, QuiLog is the perfect platform to amplify your voice and share your expertise.`,
    openGraph: {
      title:{
        template : "%s | Quilog",
        default: "Quilog"
      },
      description:"Quilog a blogger choice blogging app for your personal blog. Whether you're a travel enthusiast, a tech guru, a developer, or a fashion aficionado, QuiLog is the perfect platform to amplify your voice and share your expertise.",
      type: "website",
      url: `https://quilog.vercel.app/`,
    }
  }
}


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>

      <body className={`${montserrat.variable} font-montserrat box-border bg-[url('https://raw.githubusercontent.com/TheCodeVenturer/blogHub/main/app/Images/backGround.png')] bg-cover bg-opacity-50 bg-fixed bg-no-repeat h-[calc(100vh-20px)] m-0 p-0 relative`} >

      <NextAuthProvider>
        <Toaster />
          <StateContext>
          <LayoutProvider>
            <main className='md:pt-[61px] pt-[53px] h-[100vh]'>{children}</main>
          </LayoutProvider>
          </StateContext>
        </NextAuthProvider>
      </body>
    </html>
  )
}
