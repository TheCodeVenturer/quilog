import formidable from "formidable"

import User from "@/models/User";
import db from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(req,{params:{userId}}){
    try {
        await db.connect()
        const user = await User.findOne({_id:userId})
        if(!user){
            throw new Error("User not found")
        }
        const {password,likedPosts,posts, ...userData} = user._doc
        const totalLikedPosts = user.likedPosts.length
        const totalPosts = user.posts.length
        userData.totalLikedPosts = totalLikedPosts
        userData.totalPosts = totalPosts
        return new Response(JSON.stringify(userData), {status: 200})
        
    } catch (error) {
        return new Response(JSON.stringify({error:error.message}), {status: 500})
    }
}

export async function PUT(req,{params:{userId}}){
    try{
        const session = await getServerSession(authOptions);
        const updatedUser = await req.json()
        await db.connect()
        if(!session || !session.user|| session.user.id !== userId){
            throw new Error("Unauthorized")
        }
        const user = await User.findOne({_id:userId})
        const imageUrl = user.image
        if(!user){
            throw new Error("User not found")
        }
        else{
            const result = await User.updateOne({ _id: userId }, {
                $set: {
                  name: updatedUser.name,
                  bio: updatedUser.bio,
                  image:imageUrl,
                  Linkedin: updatedUser.Linkedin,
                  Instagram: updatedUser.Instagram,
                  Twitter: updatedUser.Twitter,
                  Youtube: updatedUser.Youtube,
                  Website: updatedUser.Website
                }
              });
        }
        return new Response(JSON.stringify({success:"true"}), {status: 200})
    }
    catch(error){
        return new Response(JSON.stringify({error:error.message}), {status: 500})
    }
}