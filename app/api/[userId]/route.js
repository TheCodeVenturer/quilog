import User from "@/models/User";
import db from "@/lib/db";

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
export async function POST(req,{params:{userId}}){
    try{
        const updatedUser = await req.json()
        await db.connect()

        const user = User.findOne({_id:userId})
        if(!user){
            throw new Error("User not found")
        }
        else{
            user
        }

    }
    catch(error){

    }
}