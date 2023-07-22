import db from "@/lib/db"
import User from "@/models/User"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

import UserPage from "../components/userPage"
import { notFound } from "next/navigation"


export async function generateMetadata({params:{userId}}){
    const session = await getServerSession(authOptions);
    var title =""
    var description = ""
    try{
        db.connect()
        const user= await User.findOne({ _id: userId })
        .select("name bio")
        .lean();
  
  
        title = user.name
        if (title.length > 10) {
          title = `${title.slice(0, 10)}...`;
        }
        title = `${title}`;
        description = `Meet ${user.name} a blogger at Quilog \n ${user.bio}`
        return {
            title,
            description,
            openGraph: {
            title,
            description,
            type: "website",
            url: `https://quilog.vercel.app/${userId}`,
            }
        }
    }
    catch(error){
        notFound()
    }
}

export default function Page({params:{userId}}){
    return (
        <>
        <UserPage userId={userId}/>
        </>
    )
}
