'use client'
import Link from "next/link"
import { useState } from "react"
import {useSession} from 'next-auth/react'
import { useAppState } from "./context/stateContext"


export default function Home() {
  const {session,status} = useAppState()
  if(status === "authenticated"){
    return <div className="text-red-400">
      Welcome to Next.js!
      <br/>
      <Link href="/account/register">Register{session.user.id}</Link>
    </div>
  }
  return <div>loading...</div>
}