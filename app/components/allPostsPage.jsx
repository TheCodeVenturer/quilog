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

import { randomPraiseGenerator } from "./Blog";

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
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };
    fetchInitialPosts();
  }, []);

  return (
    <div
      className={`text-black h-full max-h-[calc(100vh-53px)] md:max-h-[calc(100vh-65px)] w-[95vw] md:w-[85vw] max-w-[750px] mx-auto bg-white/50 px-[2%] pt-5 border-2 shadow-lg shadow-gray-400/20 overflow-y-scroll`}
    >
      <h1 className="text-2xl md:ml-7 font-semibold">Blogs</h1>
      <SkeletonForAllPostPage className={`${loading === false && "hidden"}`} />
      <InfiniteScroll
        dataLength={postArray.length}
        next={fetchPosts}
        hasMore={postArray.length < totalPosts}
        loader={<SkeletonForAllPostPage />}
        className={`${loading === true && "hidden"}`}
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
  const handleShareClick = async () => {
    try {
      await navigator.share({
        title: `${post.title}`,
        url: `${window.location.href}/${post._id}`,
      });
      console.log("Shared successfully");
    } catch (error) {
      console.error('Error sharing:', error);
    }
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
        <div className="text-2xl md:text-3xl m-2 rounded-full md:mr-6 relative group h-6 md:h-8 cursor-pointer">
          <AiOutlineShareAlt />
          <div className="absolute -top-8 -left-[120px] md:-left-24  w-fit hidden group-hover:block">
            <div className="flex flex-row w-fit bg-gray-400/80 rounded-lg p-1 text-3xl h-fit">
              <a
                href={`whatsapp://send?text=Hey, check this ${randomPraiseGenerator()} blog on *${post.title}* by *${post.user.name}* on Quilog at ${window.location.href}/${post._id} it's a must-read!`}
                data-action="share/whatsapp/share"
                className="p-0 px-1 m-0 h-8 overflow-hidden"
                target="_blank"
              >
                <AiOutlineWhatsApp className="relative bottom-2 m-0 p-0 inline-block rounded-full text-green-600 hover:bg-green-600 hover:text-white hover:shadow-md hover:shadow-green-600/80" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}/${post._id}`}
                data-action="share/Linkedin/share"
                className="p-0 px-1 m-0 h-8 overflow-hidden"
                target="_blank"
              >
                <AiOutlineLinkedin className="relative bottom-2 inline-block rounded-md text-sky-500 hover:bg-gradient-to-b from-sky-400 to-sky-700 hover:text-white hover:shadow-md hover:shadow-sky-700/80" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=Hey, check this ${randomPraiseGenerator()} blog on ${post.title} by ${post.user.name} on Quilog at &url=${window.location.href}/${post._id}`}
                data-action="share/Twitter/share"
                className="p-0 px-1 m-0 h-8 overflow-hidden"
                target="_blank"
              >
                <AiOutlineTwitter className="relative bottom-2 inline-block rounded-full text-sky-500 hover:bg-gradient-to-b from-sky-400 to-sky-700 hover:text-white hover:shadow-md hover:shadow-sky-700/80" />
              </a>
              <button
                data-action="share/device/share"
                className="p-0 px-1 m-0 h-8 overflow-hidden"
                onClick={handleShareClick}
              >
                <BsThreeDotsVertical className="relative bottom-2 inline-block rounded-full text-zinc-700 hover:text-black hover:shadow-md" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Link href={`/posts/${post._id}`}>
        <div className=" h-fit max-h-[25vh] overflow-hidden mt-2 ml-3 md:ml-5">
          <h1 className="text-3xl font-bold my-1">{post.title}</h1>
          <ReactToMarkDown content={stringShortner(post.data)} />
        </div>
        <div className="flex justify-start text-xl ml-3 md:ml-5 mt-1 md:mt-2 mb-5">
          {post.likedBy.length > 0 && (
            <span className="flex flex-row items-center">
              <AiOutlineLike className="inline-block mr-1 text-2xl" />
              <p className="p-0 m-0">{post.likedBy.length}</p>
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

function SkeletonForAllPostPage({ className }) {
  return (
    <div className={className}>
      <SkeletonForPost />
      <SkeletonForPost />
      <SkeletonForPost />
    </div>
  );
}

function SkeletonForPost() {
  return (
    <div className="rounded-xl bg-white m-auto my-5 px-3 md:mx-6 py-2 relative border-[2.5px] shadow-md shadow-gray-400/10 ">
      <div className="flex justify-between ml-3 mt-3 md:ml-5 md:mt-5 animate pulse">
        <div className="w-fit flex items-center">
          <div className="w-9 h-9 md:w-11 md:h-11 bg-gray-400/70 border-2 rounded-full" />
          <div className="ml-3 w-28 h-6 bg-gray-400/70 rounded-xl" />
        </div>
        <div className="m-2 rounded-full md:mr-6 h-6 md:h-8" />
      </div>

      <div className=" h-fit max-h-[30vh] overflow-hidden animate-pulse">
        <div className="h-7 my-2 w-[300px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-2 w-[280px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-2 w-[210px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-2 w-[270px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-2 w-[220px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-2 w-[150px] bg-gray-400/70 rounded-xl" />
      </div>
      <div className="flex justify-start ml-3 md:ml-5 mt-1 md:mt-2 mb-5 animate-pulse">
        <span className="inline-block mr-2 h-8 w-10 bg-gray-400/70 rounded-full" />
        <span className="inline-block mr-2 h-8 w-10 bg-gray-400/70 rounded-full" />
      </div>
    </div>
  );
}
