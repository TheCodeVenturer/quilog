'use client'
import Image from "next/image"
export default function User({params}){
    return(
        <div className="">
            {params.userId}
        </div>
    )
}