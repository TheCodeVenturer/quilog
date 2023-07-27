/* eslint-disable react/no-danger */
"use client";

import { useAppState } from "../context/stateContext";
import ReactToMarkDown from "./ReactToMarkDown";

import Link from "next/link";

import { useState, useEffect, useRef } from "react";

import useSWR from "swr";

import {
  AiOutlineTwitter,
  AiFillLike,
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineWhatsApp,
  AiOutlineLinkedin,
} from "react-icons/ai";

import { BsSend, BsThreeDotsVertical, BsSendFill } from "react-icons/bs";

import toast from "react-hot-toast";

export async function fetchPostById(postId) {
  const fetchedPost = await fetch(`/api/post/${postId}`);
  const data = await fetchedPost.json();
  const post = data;
  return { post };
}

export const randomPraiseGenerator = () => {
  const randomPraise = [
    "Astonishing",
    "Awesome",
    "Beautiful",
    "Breathtaking",
    "Brilliant",
    "Charming",
    "Dazzling",
    "Delightful",
    "Elegant",
    "Enchanting",
    "Excellent",
    "Exceptional",
    "Exquisite",
    "Fabulous",
    "Fantastic",
    "Fascinating",
    "Glorious",
    "Gorgeous",
    "Graceful",
    "Impressive",
    "Incredible",
    "Lovely",
    "Magnificent",
    "Marvelous",
    "Outstanding",
    "Pleasant",
    "Pretty",
    "Remarkable",
    "Spectacular",
    "Splendid",
    "Stunning",
    "Superb",
    "Terrific",
    "Wonderful",
    "Wondrous",
  ];
  return randomPraise[Math.floor(Math.random() * randomPraise.length)];
};

export default function BlogbyId({ postId }) {
  const { data, error, isLoading } = useSWR(postId, fetchPostById, {
    refreshInterval: 0,
  });
  const { session, status, user } = useAppState();
  const [comment, setComment] = useState("");
  const [isliked, setLiked] = useState(false);
  const [belowBox, setBelowBox] = useState("comments");
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
      // console.log(data.error);
    } else {
      setLiked((currentLikeState) => {
        if (!currentLikeState) {
          data.post.likedBy.push({
            _id: session.user.id,
            name: user.name,
            image: user.image,
          });
          return true;
        } else {
          const index = data.post.likedBy.findIndex(
            (ele) => ele._id === session.user.id
          );
          if (index !== -1) {
            data.post.likedBy.splice(index, 1);
          }
          return false;
        }
      });
    }
  };

  const handleCommentSubmit = async (e) => {
    if (status === "unauthenticated") {
      toast.error("Please login to Comment on the post");
      return;
    }
    const res = await fetch(`/api/post/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });
    const response = await res.json();
    if (response.error) {
      // console.log(data.error);
    } else {
      data.post.comments.unshift({
        text: comment,
        user: {
          _id: session.user.id,
          name: user.name,
          image: user.image,
        },
        createdAt: new Date().toISOString(),
      });
    }
    setComment("");
  };

  const handleShareClick = async () => {
    try {
      await navigator.share({
        title: `${data.post.title}`,
        url: `${window.location.href}`,
      });
      console.log("Shared successfully");
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  return (
    <div className="text-black h-[100vh] max-h-[calc(100vh-53px)] md:max-h-[calc(100vh-65px)] w-[92vw] max-w-[750px] mx-auto bg-white/50 px-[2%] pt-3 md:pt-5 border-2 shadow-lg shadow-gray-400/20 overflow-y-scroll">
      {isLoading === true ? (
        <SkeletonForPost />
      ) : (
        <div className="rounded-xl bg-white m-auto my-5 px-3 md:mx-6 py-2 relative border-[2.5px] shadow-md shadow-gray-400/10">
          <Link
            className="w-fit flex items-center ml-3 mt-3 md:ml-5 md:mt-5"
            href={`/${data.post.user._id}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-9 h-9 md:w-11 md:h-11 bg-gray-500 border-2 border-gray-700 rounded-full"
              src={`${data.post.user.image}`}
              height={100}
              width={100}
              alt={`${data.post.user.name}`}
            />
            <p className="ml-3 font-bold text-md md:text-lg">
              {data.post.user.name}
            </p>
          </Link>
          <div className="h-fit ml-3 mt-3 md:ml-5">
            <h1 className="text-3xl font-bold my-1">
              {data.post.title}
            </h1>
            <ReactToMarkDown content={data.post.data} />
          </div>
          <div className={`flex items-start justify-around h-14 mt-4`}>
            <div
              className={`text-center w-[100px] ${
                belowBox === "likes" && "border-b border-gray-600"
              } h-14 overflow-hidden`}
            >
              <button className={`text-3xl m-0.5`} onClick={handleLikeClick}>
                {isliked ? <AiFillLike /> : <AiOutlineLike />}
              </button>
              <span
                className="block text-xs text-center mb-1 cursor-pointer underline text-blue-600 relative -top-1"
                onClick={() =>
                  setBelowBox(belowBox === "likes" ? "none" : "likes")
                }
              >
                {data.post.likedBy.length > 0 &&
                  `liked by ${data.post.likedBy.length} people`}
              </span>
            </div>
            <div
              className={`text-center w-[100px] h-full ${
                belowBox === "comments" && "border-b-2 border-gray-600"
              } `}
              onClick={() =>
                setBelowBox(belowBox === "comments" ? "none" : "comments")
              }
            >
              <button className=" text-3xl m-0.5 ">
                <AiOutlineComment />
              </button>
            </div>
            <div className="text-center w-[100px] h-full">
              <div className="text-3xl m-0.5 relative group cursor-pointer w-fit mx-auto">
                <AiOutlineShareAlt />
                <div className="absolute top-6 -left-20  w-0 h-0 hidden group-hover:block">
                  <div className="flex flex-row w-fit bg-gray-400/80 rounded-lg px-1 py-0.5 text-3xl cursor-pointer">
                    <a
                      href={`whatsapp://send?text=Hey, check this ${randomPraiseGenerator()} blog on *${
                        data.post.title
                      }* by *${data.post.user.name}* on Quilog at ${
                        window.location.href
                      } it's a must-read!`}
                      data-action="share/whatsapp/share"
                      className="p-0 px-1 m-0 h-8 overflow-hidden"
                      target="_blank"
                    >
                      <AiOutlineWhatsApp className="relative bottom-1.5 inline-block rounded-full text-green-600 hover:bg-green-600 hover:text-white hover:shadow-md hover:shadow-green-600/80" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                      data-action="share/Linkedin/share"
                      className="p-0 px-1 m-0 h-8 overflow-hidden"
                      target="_blank"
                    >
                      <AiOutlineLinkedin className="relative bottom-1.5 inline-block rounded-md text-sky-500 hover:bg-gradient-to-b from-sky-400 to-sky-700 hover:text-white hover:shadow-md hover:shadow-sky-700/80" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=Hey, check this ${randomPraiseGenerator()} blog on ${
                        data.post.title
                      } by ${data.post.user.name} on Quilog at &url=${
                        window.location.href
                      }`}
                      data-action="share/Twitter/share"
                      className="p-0 px-1 m-0 h-8 overflow-hidden"
                      target="_blank"
                    >
                      <AiOutlineTwitter className="relative bottom-1.5 inline-block rounded-full text-sky-500 hover:bg-gradient-to-b from-sky-400 to-sky-700 hover:text-white hover:shadow-md hover:shadow-sky-700/80" />
                    </a>
                    <button
                      data-action="share/device/share"
                      className="p-0 px-1 m-0 h-8 overflow-hidden"
                    >
                      <BsThreeDotsVertical onClick={handleShareClick} className="relative bottom-1.5 inline-block rounded-full text-zinc-700 hover:text-black" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-fit">
            <div
              className={`text-center ${
                belowBox === "comments" ? "block" : "hidden"
              }`}
            >
              <CommentInput
                comment={comment}
                setComment={setComment}
                handleSubmit={handleCommentSubmit}
              />
              {data.post.comments.length > 0 && (
                <Comments comments={data.post.comments} />
              )}
            </div>
            <div className={`${belowBox === "likes" ? "block" : "hidden"}`}>
              <Likes likedBy={data.post.likedBy} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Likes = ({ likedBy }) => {
  return (
    <div className="text-left py-2 ml-3 md:ml-5">
      <h1 className="text-xl font-semibold my-1">Liked By</h1>
      {likedBy.map((ele, id) => {
        return (
          <Link
            key={id}
            className="w-fit m-1.5 flex items-center rounded-3xl "
            href={`/${ele._id}`}
          >
            <div className="w-9 h-9 rounded-full text-4xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-9 h-9 rounded-full"
                src={ele.image}
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
  return (
    <div className="text-left py-2">
      {comments.map((ele, id) => {
        const date = new Date(ele.createdAt);

        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });

        const formattedDate = `${day} ${month}`;
        return (
          <div key={id} className="p-1 m-2 rounded">
            <div className="flex items-center ">
              <Link
                className="w-fit flex items-center md:ml-2"
                href={`/${ele.user._id}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-7 h-7 md:w-9 md:h-9 bg-gray-500 rounded-full"
                  src={ele.user.image}
                  height={100}
                  width={100}
                  alt={ele.user.name}
                />
                <p className="ml-1 font-semibold text-md md:text-lg">
                  {ele.user.name}
                </p>
              </Link>
              <p className="m-0 p-0 ml-2 text-gray-500 font-bold text-xs">
                {formattedDate}
              </p>
            </div>
            <div className="ml-8 pl-1 md:ml-12 text-lg border border-gray-400 rounded-md">
              {ele.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CommentInput = ({ comment, setComment, handleSubmit }) => {
  const textareaRef = useRef(null);
  function handleChange(e) {
    setComment(e.target.value);
    textareaRef.current.style.resize = "none";
    textareaRef.current.style.height = `max(4px,${textareaRef.current.scrollHeight}px)`;
  }
  return (
    <div className="flex items-center justify-around border border-gray-500/60 my-2 w-[95%] md:w-[85%] rounded-3xl mx-auto pl-1 py-0.5">
      <textarea
        ref={textareaRef}
        className="rounded-3xl md:rounded-2xl p-1 outline-0 border-0 w-[90%] overflow-hidden bg-transparent"
        rows={1}
        value={comment}
        placeholder="Add Your Comment..."
        onChange={handleChange}
        style={{ minHeight: `4px`, resize: "none" }}
      />
      <button
        className="text-2xl text-black p-1 rounded-full m-1 group self-end"
        onClick={handleSubmit}
      >
        <BsSend className="group-hover:hidden" />
        <BsSendFill className="hidden group-hover:block" />
      </button>
    </div>
  );
};

function SkeletonForPost() {
  return (
    <div className="rounded-xl bg-white m-auto my-5 px-3 md:mx-6 py-2 relative border-[2.5px] shadow-md shadow-gray-400/10">
      <div className="flex justify-between ml-3 mt-3 md:ml-5 md:mt-5 animate-pulse">
        <div className="w-fit flex items-center">
          <div className="w-9 h-9 md:w-11 md:h-11 bg-gray-400/70 border-2 rounded-full" />
          <div className="ml-3 font-bold text-md w-28 h-6 bg-gray-400/70 rounded-xl" />
        </div>
      </div>

      <div className=" h-fit ml-3 md:ml-5 animate-pulse">
        <div className=" h-7 my-2 w-[300px] md:w-[350px] bg-gray-400/70 rounded-xl" />
        <div className="h-7 my-3 w-[150px] md:hidden  bg-gray-400/70 rounded-xl mb-3" />
        <div className="h-4 my-3 w-[250px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[280px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[230px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[220px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[250px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[150px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[200px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[250px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[200px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[250px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[220px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[200px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[250px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[250px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[230px] bg-gray-400/70 rounded-xl" />
        <div className="h-4 my-3 w-[180px] bg-gray-400/70 rounded-xl" />
      </div>
      <div className={`flex items-start justify-around mt-4 animate-pulse`}>
        <div className="w-[50px] h-10 bg-gray-400/70 rounded-xl"></div>
        <div className="w-[50px] h-10 bg-gray-400/70 rounded-xl"></div>
        <div className="w-[50px] h-10 bg-gray-400/70 rounded-xl"></div>
      </div>
    </div>
  );
}
