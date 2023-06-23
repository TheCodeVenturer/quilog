"use client";
import db from "@/lib/db";
import Post from "@/models/Post";
import Like from "@/models/Like";
import Comment from "@/models/Comment";
import User from "@/models/User";
import PostBottom from "@/app/components/postBottom";
// import { notFound } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";

export const revalidate = false

export async function fetchPostById(_id) {
  try {
    await db.connect();
    const foundPost = await Post.find({ _id })
    .populate({
      path: 'likedBy',
      model: 'Like',
      options: { lean: true } 
    })
    .populate({
      path: 'comments',
      model: 'Comment',
      options: { lean: true } 
    });

    if (!foundPost) {
      return {};
    }
    return { post:foundPost };
  } catch (error) {
    return {};
  }
}

export default async function PostbyId({params}){
// export default function PostbyId() {
  const [isliked, setLiked] = useState(true);
  const [comments, setComments] = useState([]);
  const [belowBox, setBelowBox] = useState("none");

  const {post} = await fetchPostById(params.postId)
  if(!post){
    return <div >Not Found</div>
  }
  const likeClick = (e) => {
    console.log("hello");
    setLiked((isliked) => !isliked);
  };
  return (
    <div className="w-full sm:w-[400px] my-3 rounded-xl bg-gray-900 m-auto md:w-[65%]">
      <Link className="w-fit m-1 p-1 md:m-2 md:p-2 flex items-center" href="#">
        <div className="w-9 h-9 bg-red-900 rounded-full"></div>
        <p className="ml-3 font-bold text-md">User</p>
      </Link>
      <PostBottom style={`border-y-4 w-full m-auto my-1 p-4 `} title={post.title} content={post.data} suppressHydrationWarning />
      <div className={`border-y-4 flex items-start justify-between px-10 `}>
        <div className="text-center">
          <button
            className="text-3xl text-center mx-1 sm:mx-5 pt-2"
            onClick={likeClick}
          >
            {isliked ? <AiFillLike /> : <AiOutlineLike />}
          </button>
          <span
            className="block text-xs text-center mb-1 cursor-pointer underline text-blue-600"
            onClick={() => 
              setBelowBox((belowBox) => (belowBox === "likes" ? "none" : "likes"))
            }
          >
            liked by 5 bloggers
          </span>
        </div>
        <button
          className="text-3xl mx-1 sm:mx-5 p-2"
          onClick={() =>
            setBelowBox((belowBox) => (belowBox === "comments" ? "none" : "comments"))
          }
        >
          <AiOutlineComment />
        </button>
        <button className="text-3xl mx-1 sm:mx-5 p-2">
          <AiOutlineShareAlt />
        </button>
      </div>
      <div className="w-full h-fit">
        {/* {belowBox === "likes" ? (<Likes likedBy={post.likedBy}/>) : belowBox === "comments" ? (<Comments comments={post.comments}/>) : null} */}
      </div>
    </div>
  );
}

const Likes = ({likedBy}) => {
  return <>Likes</>;
};
const Comments = ({comments}) => {
  return <>Comments</>;
};
