'use client'
import { useState } from "react"
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation'
export default function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { data: session, status } = useSession()
    const handleSubmit = async (e) => {
        const data = {name,email,password}
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    }
    if (status === "authenticated") {
        redirect('/')
    }
    if(status==="loading")
        return <div>Loading...</div>
    return(
        <>
        input name: <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <br/>
        input email: <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br/>
        input password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br/>
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}