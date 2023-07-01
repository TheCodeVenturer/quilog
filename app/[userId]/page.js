'use client'
import { useEffect,useState } from "react"

import Image from "next/image"
import { notFound } from "next/navigation"

export default function UserPage({params:{userId}}){
    const[userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        async function getUser(){
            const res = await fetch(`/api/${userId}`)
            const response = await res.json()
            setUserData(response)
            setLoading(false)
            console.log(response);

        }
        getUser()
    },[])
    if(loading){
        return(
            <div className="m-auto text-center mt-10 w-[80%] md:w-[70%]">
                Loading...
            </div>
        )
    }
    if(userData.error)
        notFound()
    return(
        <div className="m-auto text-center mt-10 w-[80%] md:w-[70%]">
        <div className="flex justify-around">
        <Image className="m-auto bg-red-500 rounded-full w-48 h-48 md:h-56 md:w-56" src="/Images/profile.png" width={200} height={200} alt=""/>
        <div>Niraj Modi</div>
        </div>

            {userId}
        </div>
    )
}
