"use client";

import { useState, useRef, useEffect } from "react";

import ReactToMarkDown from "../components/ReactToMarkDown";
import { useRouter } from "next/navigation";
import { useAppState } from "../context/stateContext";

import toast from "react-hot-toast";

const activeStyle = "text-blue-500 border-0 border-b-2 border-blue-500";
const deactiveStyle = "text-black";


export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeEdit, setActiveEdit] = useState(true);
  const router = useRouter();
  const { session, status } = useAppState();
  if (status === "unauthenticated") {
    router.push("/account/login");
  }
  if (status === "loading") {
    return <div>loading...</div>;
  }

  function handleCancel() {
    router.back();
  }

  async function handleSubmit() {
    if(!title){
      toast.error("Title required");
      return;
    } 
    if(!content){
      toast.error("Content required");
      return;
    } 
    const data = { userId: session.user.id, title, content };
    const res = await fetch("/api/newPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    toast.success("Post created successfully");
    const responseId = await res.json();
    router.push(`/posts/${responseId}`);
    setTitle("");
    setContent("");
  }
  return (
    <>
      <div className="text-black h-full max-h-[calc(100vh-53px)] md:max-h-[calc(100vh-65px)] w-[95vw] md:w-[85vw] max-w-[750px] mx-auto bg-white/50 px-[2%] pt-5 border-2 shadow-lg shadow-gray-400/20 overflow-hidden">
        <div className="flex p-1 sm:ml-2 justify-between sticky bg-white/70 w-[calc(100%-8px)]">
          <div className="flex">
            <button
              className={`px-1 mx-2 text-sm sm:text-lg font-bold tracking-wider ${
                activeEdit ? activeStyle : deactiveStyle
              } hover:text-blue-500`}
              disabled={activeEdit ? true : false}
              onClick={() => setActiveEdit(true)}
            >
              Write
            </button>
            <div className="border-l-2 border-zinc-500"></div>
            <button
              className={`px-1 mx-2 text-sm sm:text-lg font-bold tracking-wider ${
                activeEdit ? deactiveStyle : activeStyle
              } hover:text-blue-500`}
              disabled={activeEdit ? false : true}
              onClick={() => setActiveEdit(false)}
            >
              Preview
            </button>
          </div>
          <div className="flex">
            <button
              className="mx-1 p-1 px-2 font-semibold text-black bg-[#6c6e7120] rounded-xl hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/10"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="mx-1 p-1 px-2 font-semibold text-[#ffffff] bg-[#26a535] rounded-xl  hover:bg-green-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="border-b border-zinc-700/40 mt-2"></div>
        <div className="p-3">
          <div className={`${activeEdit ? "block" : "hidden"}`}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className={`w-full outline-0 p-1 pl-2 md:pl-3 text-xl rounded-full border text-black font-semibold border-zinc-700/40 shadow-sm`}
              placeholder="Enter Title"
            />
            <TextBox content={content} setContent={setContent} />
          </div>
          <div className="h-fit ml-2 mt-3 md:ml-5">
            <h1 className="text-2xl md:text-3xl font-semibold my-1 ml-1">{title}</h1>
            <div
              className={`${content ? "" : "text-zinc-600"} ${
                activeEdit ? "hidden" : "block"
              } overflow-y-scroll h-[calc(70vh+24px)]`}
            >
              <ReactToMarkDown
                content={content ? content : "#### Nothing to Show Here"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const TextBox = ({ content, setContent }) => {
  const textareaRef = useRef(null);
  function handleChange(e) {
    setContent(e.target.value);
  }
  return (
    <textarea
      ref={textareaRef}
      className="p-1 pl-2 md:pl-3 mt-2  bg-transparent outline-0 border rounded-md w-full h-[70vh] resize-none border-zinc-600/40"
      value={content}
      placeholder="Write Your Post Here"
      onChange={handleChange}
    />
  );
};
