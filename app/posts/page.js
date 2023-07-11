
import User from "@/models/User";
import db from "@/lib/db";
import PostPage from "../components/allPostsPage";
import { redirect } from 'next/navigation'

export async function generateMetadata({searchParams}){
    var title="Posts"
    if(Object.keys(searchParams).length && !searchParams.userId){
        // console.log("redirecting");
        redirect("/posts")
    }
    if(searchParams.likedPost && searchParams.userId){
        try{
            db.connect()
            const user = await User.findOne({_id:searchParams.userId})
            title = `${user.name}'s liked posts`
        }
        catch(error){
            redirect('/posts')
        }
    }
    else if(searchParams.userId){
        try{
            db.connect()
            const user = await User.findOne({_id:searchParams.userId})
            title = `${user.name}'s posts`
        }catch(err){
            redirect('/posts')
        }
    }
    return{
        title,
        description: "Technonatura is a platform for learning and sharing knowledge about technology and nature.",
    }
}

export default async function Page({searchParams}){
    return (<PostPage query={searchParams}/>)
}

