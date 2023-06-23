'use client'
import db from "./db";
import Post from "@/models/Post";
import User from "@/models/User";
import Comment from "@/models/Comment";

export async function fetchPostById(postId) {
    try {
        await db.connect()
        const foundPost = await Post.findOne({_id:postId})
        
        if(!foundPost){
            return ({error:"Post not found"})
        }
  
        return (foundPost)
    } catch (error) {
        return ({error:error.message})
    }
}

export async function fetchPostsByUserId(userId) {
    try {
        await db.connect()
        const foundUser = await User.findOne({_id:userId})
        
        if(!foundUser){
            return ({error:"No User Found"})
        }
  
        const {createdAt,updatedAt,password,...user} = foundUser._doc
        return ({user})
    } catch (error) {
        return ({error:error.message})
    }
}