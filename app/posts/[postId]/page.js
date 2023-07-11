
import BlogbyId from "@/app/components/Blog"
import { getUserData } from "@/app/fetchUserDetails";
import db from "@/lib/db";
import Post from "@/models/Post";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function generateMetadata({params:{postId}}){
  var title =""
  var description = ""
  try{
      db.connect()
      const post = await Post.findOne({ _id: postId })
      .select("title user likedBy comments")
      .populate({
        path: "user",
        select: "name image",
        options: { lean: true },
      })
      .lean();


      title = post.title
      if (title.length > 10) {
        title = `${title.slice(0, 10)}...`;
      }
      title = `${title} | Posts`;
      description = `A postby by ${post.user.name} \n ${post.likedBy.length} likes \t ${post.comments.length} comments`
  }
  catch(error){
      redirect('/posts')
  }
  return{
    metadataBase: new URL(`http://localhost:3000`),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `http://localhost:3000/posts/${postId}`,
      images:[
        {
          url:"http://localhost:3000/api/image?postId="+postId,
          alt:"new"
        }
      ]
    }
  }
}


export default async function Page({params:{postId}}){
  const session = await getServerSession(authOptions);
  
  const user = session?await getUserData(session.user.id):""

    return (
      <>
        <BlogbyId postId={postId} user = {user}/>
        </>
    )
}
const Share = "https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/#:~:text=bit%20of%20preparation.-,Get%20the%20Session%20in%20a%20Server%20Component,file%20during%20the%20NextAuth%20setup."