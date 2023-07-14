'use client'
import { useAppState } from "./context/stateContext"
import { signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

export const dynamic = "force-static"

export default function Home() {
  const {session,status} = useAppState()
  if(status === "authenticated"){
    return <div className="text-red-400">
      Welcome to Next.js!
      <br/>
    <button onClick={()=>signOut()}>SignOut</button>
    <img src="./backGround.png" width="100" height="100" alt=""/>
    </div>
  }
  return <div>
  <Link href="/account/register">Register</Link>
  <Link href="/account/login">Login</Link>
  </div>
}