"use client";

import EditUserPage from "./editUserPage";

import { useEffect, useState } from "react";

import { useAppState } from "../context/stateContext";

import Link from "next/link";


import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"

import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineGlobal,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineEdit
} from "react-icons/ai";

export default function UserPage({ userId }) {
  const { session, status } = useAppState();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editBoxVisible, setEditBoxVisible] = useState(false);
  var userPronunce = "";
  useEffect(() => {
    async function getUser() {
      const res = await fetch(`/api/${userId}`);
      const response = await res.json();
      setUserData(response);
      setTimeout(() => {
        setLoading(false);
    }, 150);
    }
    getUser();
  }, [editBoxVisible]);
  if (loading) {
    return (
       <SkeletonForUserPage/>
    );
  }
  if (userData.error) notFound();
  if (session?.user?.id === userId) userPronunce = "My";
  else {
    userPronunce = userData.name;
    if (userPronunce.length > 8) userPronunce = userPronunce.slice(0, 8);
    userPronunce = `${userPronunce}'s`;
  }
  return (
    <div className={`box-border mb-5 mx-auto max-w-[95vw] md:max-w-[700px] lg:max-w-[750px] border border-gray-400 bg-white bg-opacity-50 shadow-lg shadow-gray-900/70 backdrop-filter backdrop-blur-sm  relative h-[max(530px,calc(100vh-105px))] sm:h-[max(730px,calc(100vh-105px))] md:h-[max(600px,calc(100vh-64px))] ${editBoxVisible===true && "overflow-y-scroll"}`}>
      <div className="flexrounded-2xl border  bg-white shadow-md shadow-gray-700/50 mx-3 md:mx-6 my-4 md:my-7 min-h-[calc(100%-3.5rem)] rounded-3xl md:px-8 lg:px-20 relative">
        <div className="flex flex-col md:flex-row items-center lg:mt-[3vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bg-white border-2 border-gray-400 my-3 relative rounded-full w-44 h-44 md:h-56 md:w-56 mx-auto md:mx-0" src={userData.image} width={200} height={200} alt={userData.name} />
          <div className="text-center md:text-left text-black md:px-3 lg:px-7">
            <h1 className="text-2xl font-bold">
              {userData.name}
            </h1>
            <p className="my-2 mx-auto md:mx-0 text-lg leading-5 max-w-[450px]">
              {userData.bio}
            </p>
            {userData.totalPosts > 0 && (
              <Link
                href={`/posts?userId=${userData._id}`}
                className="text-xl font-bold block cursor-pointer hover:underline hover:text-blue-700"
              >
                {userPronunce} Posts: {userData.totalPosts}
              </Link>
            )}
            {userData.totalLikedPosts > 0 && (
              <Link
                href={`/posts?userId=${userData._id}&likedPost=true`}
                className="text-xl font-bold block cursor-pointer hover:underline hover:text-blue-700"
              >
                {userPronunce} Liked Posts: {userData.totalLikedPosts}
              </Link>
            )}
          </div>
        </div>
        {/* Social Section Starts here */}
        <div className="mx-auto md:mx-0 flex justify-around md:flex-col mt-3 md:px-5 text-4xl lg:mt-[3vh] text-black max-w-[450px]">
          <CustomButtons
            text={`${userData.Instagram}`}
            className="group-hover/edit:bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 group-hover/edit:text-white group-hover/edit:shadow-pink-500/80"
            baselink = "https://www.instagram.com/"
            extender = "@"
          >
            <AiOutlineInstagram />
          </CustomButtons>

          <CustomButtons
            text={`${userData.Linkedin}`}
            className="group-hover/edit:bg-gradient-to-b from-sky-400 to-sky-700 group-hover/edit:text-white group-hover/edit:shadow-sky-700/80"
            baselink="https://www.linkedin.com/in/"
          >
            <AiOutlineLinkedin />
          </CustomButtons>

          <CustomButtons
            text={`${userData.Twitter}`}
            className="group-hover/edit:bg-gradient-to-bl to-sky-400 from-blue-500  group-hover/edit:text-white group-hover/edit:shadow-sky-500/80"
            baselink= "https://twitter.com/"
            extender = "@"
          >
            <AiOutlineTwitter />
          </CustomButtons>
          <CustomButtons
            text={`${userData.Youtube}`}
            className="group-hover/edit:bg-[#ff0000] group-hover/edit:text-white group-hover/edit:shadow-red-500/80"
            baselink="https://www.youtube.com/"
          >
            <AiOutlineYoutube />
          </CustomButtons>
          <CustomButtons
            text={`${userData.Website}`}
            className="group-hover/edit:bg-gradient-radial from-gray-800 to-gray-900 group-hover/edit:text-white group-hover/edit:shadow-gray-800/80"
          >
            <AiOutlineGlobal />
          </CustomButtons>
        </div>
        {/* Social Section Ends here */}
        {userPronunce==="My" && <div className="absolute top-1 right-1 sm:top-5 sm:right-5 text-3xl text-black hover:bg-zinc-700 hover:text-white p-1.5 rounded-full cursor-pointer shadow-md hover:shadow-gray-500" onClick={()=>setEditBoxVisible(true)} baselink = "">
          <AiOutlineEdit/>
        </div>}
      </div>
      {editBoxVisible===true && <EditUserPage userData={userData} close = {setEditBoxVisible}/>}
    </div>
  );
}

const CustomButtons = ({ text, baselink, className, children, extender }) => {
    var visualText = `${extender?"@":""}${text}`;
    if(visualText.slice(0,4) === "http") visualText = visualText.slice(visualText.indexOf("/")+2)
  return (
    <div className="text-center md:text-left group" >
      {text.length > 0 && (
        <a href={`${baselink?baselink:""}${text?text:""}`} className="inline-block group/item" target="_blank">
          <span className="flex items-center group/edit">
            <span
              className={`p-1 group-hover/edit:shadow-lg ${className} rounded-full`}
            >
              {children}
            </span>
            <p className="px-1 hidden md:block text-xl w-fit underline">
              {visualText}
            </p>
          </span>
        </a>
      )}
    </div>
  );
};


const SkeletonForUserPage = () =>{
  return (
    <div className={`box-border mb-5 mx-auto max-w-[95vw] md:max-w-[700px] lg:max-w-[750px] border border-gray-400 bg-white bg-opacity-50 shadow-lg shadow-gray-900/70 backdrop-filter backdrop-blur-sm  relative h-[max(530px,calc(100vh-105px))] sm:h-[max(730px,calc(100vh-105px))] md:h-[max(600px,calc(100vh-64px))] animate-pulse`}>
      <div className="flexrounded-2xl border  bg-white shadow-md shadow-gray-700/50 mx-3 md:mx-6 my-4 md:my-7 min-h-[calc(100%-3.5rem)] rounded-3xl md:px-8 lg:px-20 relative">
        <div className="flex flex-col md:flex-row items-center lg:mt-[3vh]">
          <div className="bg-gray-400/50 border-2 border-gray-400 my-3 relative rounded-full w-44 h-44 md:h-56 md:w-56 mx-auto md:mx-0 " />
          <div className="text-center md:text-left text-black md:px-5 lg:px-10">
            <div className="mx-auto md:mx-0 h-8 w-60 bg-gray-400/50 rounded-2xl mb-2"/>
            <div className="mx-auto md:mx-0 h-3 w-60 bg-gray-400/50 rounded-xl my-1 md:mt-4"/>
            <div className="mx-auto md:mx-0 h-3 w-52 bg-gray-400/50 rounded-xl my-1"/>
            <div className="mx-auto md:mx-0 h-3 w-60 bg-gray-400/50 rounded-xl my-1 "/>
            <div className="mx-auto md:mx-0 h-3 w-48 bg-gray-400/50 rounded-xl my-1"/>
            <div className="mx-auto md:mx-0 h-3 w-20 bg-gray-400/50 rounded-xl my-1"/>
            <div className="mx-auto md:mx-0 h-5 w-48 bg-gray-400/50 rounded-2xl my-2 md:mt-4"/>
            <div className="mx-auto md:mx-0 h-5 w-48 bg-gray-400/50 rounded-2xl my-2"/>
          </div>
        </div>
        {/* Social Section Starts here */}
        <div className="mx-auto md:mx-0 flex justify-around md:flex-col mt-3 md:px-5 text-4xl lg:mt-[3vh] text-black max-w-[450px]">
          <SkeletonButtons/>
          <SkeletonButtons/>
          <SkeletonButtons/>
          <SkeletonButtons/>
          <SkeletonButtons/>
        </div>
        {/* Social Section Ends here */}
      </div>
    </div>
  )
}


const SkeletonButtons = () => {
return (
  <div className="text-center md:text-left flex items-center my-1" >
          <span
            className={`p-1 bg-gray-400/50  rounded-full w-10 h-10`}
          />
          <div className="px-1 hidden md:block text-xl w-36 h-5 bg-gray-400/50 ml-2 rounded-2xl"/>
  </div>
);
};

