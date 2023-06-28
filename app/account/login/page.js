'use client'
import { useState } from "react"
import {useSession,signIn} from 'next-auth/react'
import { redirect } from 'next/navigation'
export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { data: session, status } = useSession()
    const handleSubmit = async (e) => {
        const payload = {email,password}
        const response = await signIn("credentials",{redirect:false,...payload})
        if(response.error==="Invalid credentials")
            alert("Invalid credentials")
        setEmail("");
        setPassword("");
  };
  if (status === "authenticated") {
    redirect('/')
  }
    return(
        <>
        input email: <input className="text-red-600" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br/>
        input password: <input className="text-red-600" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br/>
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}