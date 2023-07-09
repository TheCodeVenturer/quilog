/* eslint-disable react/no-danger */
"use client";
import PostBottom from "./postBottom";
import { useAppState } from "@/app/context/stateContext";

import Link from "next/link";
import Image from "next/image";

import { useState,  useEffect ,useRef } from "react";

import useSWR from "swr";

import {
  AiFillLike,
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt
} from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import {BsSend,BsSendFill} from "react-icons/bs";

import toast from "react-hot-toast";


export async function fetchPostById(postId) {
  const fetchedPost = await fetch(`/api/post/${postId}`);
  const data = await fetchedPost.json();
  const post = data;
  return { post };
}


export default function BlogbyId({ postId }) {
  const { data, error, isLoading } = useSWR(postId, fetchPostById, {
    refreshInterval: 0,
  });
  const { session, status } = useAppState();
  const [comment, setComment] = useState("");
  const [isliked, setLiked] = useState(false);
  const [belowBox, setBelowBox] = useState("none");
  const refCommentBok = useRef(null);
  useEffect(() => {
    async function setLike() {
      if (
        status === "authenticated" &&
        !isLoading &&
        data &&
        (await data.post.likedBy.find((ele) => ele._id === session.user.id))
      )
        setLiked(true);
    }
    console.log(data);
    setLike();
  }, [status, isLoading]);
  const handleLikeClick = async () => {
    if (status === "unauthenticated") {
      toast.error("Please login to like the post");
      return;
    }
    const res = await fetch(`/api/post/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
    if (response.error) {
      console.log(data.error);
    } else {
      setLiked((currentLikeState) => {
        if (!currentLikeState) {
          data.post.likedBy.push({_id: session.user.id, name: session.user.name, image: session.user.image});
          console.log(data.post.likedBy);
          return true;
        } else {
          const index = data.post.likedBy.findIndex((ele) => (ele._id === session.user.id));
          if (index !== -1) { 
            data.post.likedBy.splice(index, 1);
          }
          console.log(data.post.likedBy);
          return false;
        }
      });
    }
  };

  const handleCommentSubmit = async (e) => {
    if (status === "unauthenticated") {
      toast.error("Please login to like the post");
      return;
    }
    const res = await fetch(`/api/post/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
      cache:"no-cache"
    });
    const response = await res.json();
    if (response.error) {
      console.log(data.error);
    } else {
          data.post.comments.unshift({text: comment, user:{
            _id: session.user.id, name: session.user.name, image: session.user.image
          } });
    }
    setComment("");
  }
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Post not found</div>;
  return (
    <div className="w-full sm:w-[400px] my-3 rounded-xl bg-gray-900 mx-auto md:w-[65%]">
      <Link className="w-fit p-4 flex items-center" href={`/${data.post.user._id}`}>
          <Image className="w-9 h-9 bg-black rounded-full" src={`${data.post.user.image}`} height={100} width = {100} alt={`${data.post.user.name}`}/>
          <p className="ml-3 font-bold text-md">{data.post.user.name}</p>
        </Link>
      <PostBottom
        style={`border-y-2 w-full m-auto my-1 p-5 md:px-10`}
        title={data.post.title}
        content={data.post.data}
        suppressHydrationWarning
      />
      <div className={`flex items-start justify-between`}>
        <div className="text-center w-[33%]">
          <button
            className={`text-3xl text-center pt-2`}
            onClick={handleLikeClick}
          >
            {isliked ? <AiFillLike /> : <AiOutlineLike />}
          </button>
          <span
            className="block text-xs text-center mb-1 cursor-pointer underline text-blue-600"
            onClick={() => setBelowBox(belowBox === "likes" ? "none" : "likes")}
          >
            {data.post.likedBy.length>0 && `liked by ${data.post.likedBy.length} people`}
          </span>
        </div>
        <div className="text-center w-[33%]">
        <button
          className="text-3xl p-2"
          onClick={() =>
            setBelowBox(belowBox === "comments" ? "none" : "comments")
          }
        >
          <AiOutlineComment />
        </button>
        </div>
        <div className="text-center w-[33%]">
        <button className="text-3xl p-2">
          <AiOutlineShareAlt />
        </button>
        </div>
      </div>
      <div className="w-full h-fit">
        <div className={`text-center ${belowBox === "comments" ? "block" : "hidden"}`}>
          <CommentInput comment={comment} setComment={setComment} handleSubmit={handleCommentSubmit}/>
          {data.post.comments.length>0 && <Comments comments={data.post.comments} />}
        </div>
        <div className={`${belowBox === "likes" ? "block" : "hidden"}`}>
          <Likes likedBy={data.post.likedBy} />
        </div>
      </div>
    </div>
  );
}

const Likes = ({ likedBy }) => {
  return (
    <div className="text-left pb-2 border-t-[1px]">
      {likedBy.map((ele, id) => {
        return (
          <Link
            key={id}
            className="w-fit m-1 p-1 md:m-2 md:p-2 flex items-center rounded-3xl bg-zinc-400/10"
            href="#"
          >
            <div className="w-9 h-9 rounded-full text-4xl">
            <Image
            className="w-9 h-9 bg-black rounded-full"
            src={`${ele.image}`}
            height={100}
            width={100}
            alt={`${ele.name}`}
          />
            </div>
            <p className="ml-3 font-bold text-md">{ele.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

const Comments = ({ comments }) => {
  console.log(comments);
  return (
    <div className="text-left pb-2 border-t-[1px]">
      {comments.map((ele, id) => {
        return (
          <div key={id} className="p-1 bg-zinc-400/10 m-2 rounded">
            <Link
              className="text-red-50 w-fit px-1 rounded bg-zinc-400/20 flex items-center"
              href="#"
            >
              <div className="text-sm md:text-md mx-1">
                <FaUserCircle />{" "}
              </div>
              <p className="text-sm md:text-md">{ele.user.name}</p>
            </Link>
            <div className="text-xl">{ele.text}</div>
          </div>
        );
      })}
    </div>
  );
};

const CommentInput = ({comment,setComment,handleSubmit}) => {
  const textareaRef = useRef(null);
  function handleChange(e) {
    setComment(e.target.value);
    textareaRef.current.style.resize = "none";
    textareaRef.current.style.height = `max(8px,${textareaRef.current.scrollHeight}px)`;
  }
  return (
    <div className="flex items-end justify-around">
    <textarea
      ref={textareaRef}
      className="m-2 bg-zinc-500/20 rounded-3xl md:rounded-2xl p-1 md:p-2 outline-0 border-0 w-[90%] md:w-[80%] overflow-hidden"
      value={comment}
      placeholder="Enter Your view..."
      onChange={handleChange}
      style={{ minHeight: `8px`, resize: "none" }}
    />
    <button className="text-2xl text-red-50 p-2 rounded-3xl bg-zinc-400/20 m-2 hover:bg-blue-500" onClick={handleSubmit}><BsSend />
    </button>
    </div>
  );
}
