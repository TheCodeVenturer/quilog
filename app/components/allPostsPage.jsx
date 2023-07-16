"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  AiOutlineTwitter,
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineWhatsApp,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

import { redirect } from "next/navigation";
import Link from "next/link";
import ReactToMarkDown from "./ReactToMarkDown";

// This is the post component that is used in the post page

export default function PostPage({ query }) {
  const [pageNo, setPageNo] = useState(1);
  const [postArray, setPostArray] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);

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

  return (
    <div
      className={`text-black h-full max-h-[calc(100vh-53px)] md:max-h-[calc(100vh-65px)] w-[95vw] md:w-[85vw] max-w-[750px] mx-auto bg-white/50 px-[2%] pt-5 border-2 shadow-lg shadow-gray-400/20 overflow-y-scroll`}
    >
      <h1 className="text-2xl md:ml-7 font-semibold">Blogs</h1>
      {loading === true ? (
        <SkeletonForAllPostPage />
      ) : (
        <InfiniteScroll
          dataLength={postArray.length}
          next={fetchPosts}
          hasMore={postArray.length < totalPosts}
          loader={<SkeletonForAllPostPage />}
        >
          {postArray.map((post) => {
            return <PostBox key={post._id} post={post} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
}

// Each Post in the posts page

function PostBox({ post }) {
  const shareData = {
    title: post.title,
    text: post.data,
    url: `https://Quilog.vercel.app/posts/${post._id}`,
  };
  return (
    <div className="rounded-xl bg-white m-auto my-5 px-3 md:mx-6 py-2 relative border-[2.5px] shadow-md shadow-gray-400/10 ">
      <div className="flex justify-between ml-3 mt-3 md:ml-5 md:mt-5">
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
        <button className="text-2xl md:text-3xl m-2 rounded-full md:mr-6 relative group h-6 md:h-8">
          <AiOutlineShareAlt className="block group-hover:hidden" />
          <div className="absolute -top-1 -left-[108px] md:-left-24  w-0 h-0 hidden group-hover:block">
            <div className="flex flex-row w-fit bg-gray-400/80 rounded-lg p-1 text-3xl ">
              <AiOutlineWhatsApp className="inline-block px-1 rounded-full text-green-600 hover:bg-green-600 hover:text-white hover:shadow-lg hover:shadow-green-600/80" />
              <AiOutlineLinkedin className="inline-block px-1 rounded-full text-sky-500 hover:bg-gradient-to-b from-sky-400 to-sky-700 hover:text-white hover:shadow-lg hover:shadow-sky-700/80" />
              <AiOutlineTwitter className="inline-block px-1 rounded-full text-sky-500 hover:bg-gradient-to-b from-sky-400 to-sky-700 hover:text-white hover:shadow-lg hover:shadow-sky-700/80" />
              <BsThreeDotsVertical className="inline-block px-1 rounded-full text-zinc-700 hover:bg-gradient-to-b from-sky-400 to-sky-700 hover:text-white hover:shadow-lg hover:shadow-sky-700/80" />
            </div>
          </div>
        </button>
      </div>

      <Link href={`/posts/${post._id}`}>
        <div className=" h-fit max-h-[25vh] overflow-hidden mt-2 ml-3 md:ml-5">
          <h1 className="text-2xl font-semibold my-1">
            {post.title}
          </h1>
          <ReactToMarkDown content={stringShortner(post.data)} />
        </div>
        <div className="flex justify-start text-xl ml-3 md:ml-5 mt-1 md:mt-2 mb-5">
          {post.likedBy.length > 0 && (
            <span className="flex flex-row items-center">
              <AiOutlineLike className="inline-block mr-1 text-2xl" />
              <p className="p-0 m-0">
                {post.likedBy.length}
              </p>
            </span>
          )}
          {post.comments.length > 0 && (
            <span className="flex flex-row items-center">
              <AiOutlineComment className="inline-block ml-2 mr-1 text-2xl" />
              <p className="p-0 m-0">{post.comments.length}</p>
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}

function stringShortner(str) {
  if (str.length > 350) {
    return str.substring(0, 350);
  }
  return str;
}

function SkeletonForAllPostPage() {
  return (
    <>
      <SkeletonForPost />
      <SkeletonForPost />
      <SkeletonForPost />
    </>
  );
}

function SkeletonForPost() {
  return (
    <div className="rounded-xl bg-white m-auto my-5 px-4 py-2 border-[2.5px] shadow-lg shadow-gray-500/60 ">
      <div className="flex justify-between animate-pulse">
        <div className="w-fit flex items-center">
          <div className="w-9 h-9 md:w-11 md:h-11 bg-gray-400/70 border-2 rounded-full" />
          <div className="ml-3 font-bold text-md w-28 h-6 bg-gray-400/70 rounded-xl" />
        </div>
        <div className="text-3xl w-8 h-8 rounded-full md:mr-4 bg-gray-400/70" />
      </div>

      <div className=" h-fit max-h-[30vh] overflow-hidden animate-pulse">
        <div className="mx-auto h-7 my-2 w-[250px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-2 w-[250px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-2 w-[200px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-2 w-[230px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-2 w-[180px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-2 w-[150px] bg-gray-400/70 rounded-xl" />
      </div>
      <div className="flex justify-around text-xl animate-pulse">
        <span className="inline-block mr-2 h-8 w-8 bg-gray-400/70 rounded-full" />
        <span className="inline-block mr-2 h-8 w-8 bg-gray-400/70 rounded-full" />
      </div>
    </div>
  );
}
