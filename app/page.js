'use client'
import Link from "next/link"
import { useAppState } from "./context/stateContext"


export default function Home() {
  const {session,status} = useAppState()
  if(status === "authenticated"){
    return <div className="text-red-400">
      Welcome to Next.js!
      <br/>
    </div>
  }
  return <div>
  <Link href="/account/register">Register</Link>
  <Link href="/account/login">Login</Link>
  </div>
}