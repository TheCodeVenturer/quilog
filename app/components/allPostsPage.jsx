"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { redirect } from "next/navigation";
import Link from "next/link";
import ReactToMarkDown from "./ReactToMarkDown";
import { AiOutlineShareAlt } from "react-icons/ai";

// This is the post component that is used in the post page

export default function PostPage({ query }) {
  const [pageNo, setPageNo] = useState(1);
  const [postArray, setPostArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);

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
  }, []);

  return (
    <div>
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
    <div className="rounded-xl bg-red-500 w-[90%] sm:w-[400px] md:w-[700px] m-auto my-5 p-4 h-fit overflow-hidden relative ">
      <div className="flex justify-between">
        <Link
          className="w-fit mx-2 flex items-center"
          href={`/${post.user._id}`}
        >
          <img
            className="w-9 h-9 bg-black rounded-full"
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

      <div className="text-black border-b-2 border-yellow-400 mt-2"></div>
      <Link href={`/posts/${post._id}`}>
        <div className="mt-2 p-2 h-96 md:mt-3 md:p-3 after:absolute after:w-[100%] after:h-[40%] after:bg-slate-500 after:bottom-0 after:left-0 after:opacity-40">
          <ReactToMarkDown content={post.data} />
          <div className="ml-1 border-dotted border-b-4 w-5 h-4 inline-block border-red-950"></div>
        </div>
      </Link>
    </div>
  );
}
