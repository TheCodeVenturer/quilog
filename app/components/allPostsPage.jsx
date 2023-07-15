"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { AiFillLike,AiOutlineComment } from "react-icons/ai";

import { redirect } from "next/navigation";
import Link from "next/link";
import ReactToMarkDown from "./ReactToMarkDown";
import { AiOutlineShareAlt } from "react-icons/ai";
import { set } from "mongoose";

// This is the post component that is used in the post page

export default function PostPage({ query }) {
  const [pageNo, setPageNo] = useState(1);
  const [postArray, setPostArray] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading,setLoading] = useState(true);

  async function fetchPosts() {
    var searchQueries = "";
    if (query.likedPost && query.userId) {
      searchQueries = searchQueries + `&likedPost=${query.likedPost}`;
    }
    if (query.userId) {
      searchQueries = searchQueries + `&userId=${query.userId}`;
    }
    const fetchedPost = await fetch(
      `/api/post?pageNo=${pageNo}${searchQueries}`
    );
    const data = await fetchedPost.json();
    if (!data || data.error) redirect("/posts");
    if (pageNo == 1) setTotalPosts(data.count);
    setPostArray([...postArray, ...data.posts]);
    setPageNo(pageNo + 1);
  }

  useEffect(() => {
    const fetchInitialPosts = async () => {
      await fetchPosts();
    };
    fetchInitialPosts();
    setLoading(false);
  }, []);
  
  if(loading){
    return(
      <SkeletonForAllPostPage/>
  )}

  return (
    <div
      className={`text-black min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-60px)] w-[85vw] max-w-[800px] mx-auto bg-white px-[2%] pt-5 border-2 shadow-xl shadow-gray-600`}
    >
      <h1 className="text-2xl font-semibold">Blogs</h1>
      <InfiniteScroll
        dataLength={postArray.length}
        next={fetchPosts}
        hasMore={postArray.length < totalPosts}
        loader={<h4>Loading...</h4>}
      >
        {postArray.map((post) => {
          return <PostBox key={post._id} post={post} />;
        })}
      </InfiniteScroll>
    </div>
  );
}

// Each Post in the posts page

function PostBox({ post }) {
  return (
    <div className="rounded-xl bg-white m-auto my-5 px-4 py-2 relative border-[2.5px] shadow-lg shadow-gray-500/60 ">
      <div className="flex justify-between">
        <Link className="w-fit flex items-center" href={`/${post.user._id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-9 h-9 md:w-11 md:h-11 bg-gray-500 border-2 border-gray-700 rounded-full"
            src={`${post.user.image}`}
            height={100}
            width={100}
            alt={`${post.user.name}`}
          />
          <p className="ml-3 font-bold text-md">{post.user.name}</p>
        </Link>
        <button className="text-3xl p-2 rounded-full hover:bg-zinc-400/20 md:mr-4">
          <AiOutlineShareAlt />
        </button>
      </div>

      <Link href={`/posts/${post._id}`}>
        <div className=" h-fit max-h-[30vh] overflow-hidden">
        <h1 className="text-center text-2xl md:text-3xl font-semibold my-1 underline">{post.title}</h1>
          <ReactToMarkDown content={stringShortner(post.data)} />
        </div>
        <div className="flex justify-around text-xl">
        {post.likedBy.length>0 && <span><AiFillLike className="inline-block mr-2 text-2xl"/>{post.likedBy.length}</span>}
        {post.comments.length>0 && <span><AiOutlineComment className="inline-block mr-2 text-2xl"/>{post.comments.length}</span>}
        </div>
      </Link>
    </div>
  );
}

function stringShortner(str){
  if(str.length>500){
    return str.substring(0,500);
  }
  return str;
}


function SkeletonForAllPostPage(){
  return(
    <div
      className={`text-black min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-60px)] w-[85vw] max-w-[800px] mx-auto bg-white px-[2%] pt-5 border-2 shadow-xl shadow-gray-600`}
    >
      <h1 className="text-2xl font-semibold">Blogs</h1>
       <SkeletonForPost/>
       <SkeletonForPost/>
       <SkeletonForPost/>
    </div>
  )
}

function SkeletonForPost(){
  return(
    <div className="rounded-xl bg-white m-auto my-5 px-4 py-2 border-[2.5px] shadow-lg shadow-gray-500/60 ">
    <div className="flex justify-between animate-pulse">
      <div className="w-fit flex items-center">
        <div className="w-9 h-9 md:w-11 md:h-11 bg-gray-400/70 border-2 rounded-full"/>
        <div className="ml-3 font-bold text-md w-28 h-6 bg-gray-400/70 rounded-xl"/>
      </div>
      <div className="text-3xl w-8 h-8 rounded-full md:mr-4 bg-gray-400/70"/>
    </div>

      <div className=" h-fit max-h-[30vh] overflow-hidden animate-pulse">
        <div className="mx-auto h-7 my-2 w-[250px] bg-gray-400/70 rounded-xl"/>
        <div className="h-4 my-2 w-[250px] bg-gray-400/70 rounded-xl"/>
        <div className="h-4 my-2 w-[200px] bg-gray-400/70 rounded-xl"/>
        <div className="h-4 my-2 w-[230px] bg-gray-400/70 rounded-xl"/>
        <div className="h-4 my-2 w-[180px] bg-gray-400/70 rounded-xl"/>
        <div className="h-4 my-2 w-[150px] bg-gray-400/70 rounded-xl"/>
      </div>
      <div className="flex justify-around text-xl animate-pulse">
        <span className="inline-block mr-2 h-8 w-8 bg-gray-400/70 rounded-full"/>
        <span className="inline-block mr-2 h-8 w-8 bg-gray-400/70 rounded-full"/>
      </div>
  </div>
  )
}