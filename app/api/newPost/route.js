import db from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User";
import bcrypt from "bcrypt";
export async function POST(req){
    try {
        const {userId,title,content} = await req.json()
        // console.log(name, email, pass)
        await db.connect()
        const isExisting = await User.findOne({_id:userId})
        
        if(!isExisting){
            throw new Error("You are not authorized to create a post")
        }

        const newPost = await Post.create({userId,title,data:content})

        const postId = newPost._doc._id

        return new Response(JSON.stringify(postId), {status: 201})
    } catch (error) {
        console.log(error.message);
        return new Response(JSON.stringify(error.message), {status: 500})
    }
}