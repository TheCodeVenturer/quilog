'use client'
import { useState } from "react"
import { useAppState } from "@/app/context/stateContext"
import { redirect } from 'next/navigation'
import {useRouter} from 'next/navigation'
export default function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { session, status } = useAppState()
    const router = useRouter()
    const handleSubmit = async (e) => {
        const data = {name,email,password}
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        console.log(res);
        router.push('/account/login')
    }
    if (status === "authenticated") {
        redirect('/')
    }
    if(status==="loading")
        return <div>Loading...</div>
    return(
        <div className="text-black">
        input name: <input className="text-red-600" type="text" value={name} onChange={e => setName(e.target.value)} />
        <br/>
        input email: <input className="text-red-600" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br/>
        input password: <input className="text-red-600" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br/>
        <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}