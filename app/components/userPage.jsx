"use client";

import EditUserPage from "./editUserPage";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";


import { notFound } from "next/navigation";



import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineGlobal,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineEdit
} from "react-icons/ai";

export default function UserPage({ userId }) {
  const { data:session, status } = useSession();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editBoxVisible, setEditBoxVisible] = useState(false);
  var userPronunce = "";
  useEffect(() => {
    async function getUser() {
      const res = await fetch(`/api/${userId}`);
      const response = await res.json();
      setUserData(response);
      setLoading(false);
    }
    getUser();
  }, []);
  if (loading) {
    return (
      <div className="m-auto text-center mt-10 w-[80%] md:w-[70%]">
        Loading...
      </div>
    );
  }
  if (userData.error) notFound();
  if (session?.user?.id === userId) userPronunce = "My";
  else {
    userPronunce = userData.name;
    if (userPronunce.length > 8) userPronunce = userPronunce.slice(0, 8) + "'s";
  }
  return (
    <div className={`box-border m-5 mx-auto max-w-[95vw] md:max-w-[700px] lg:max-w-[850px] border border-gray-400 bg-white bg-opacity-50 shadow-lg shadow-gray-900/70 backdrop-filter backdrop-blur-sm  relative h-[max(650px,calc(100vh-100px))] sm:h-[max(730px,calc(100vh-40px))] md:h-[max(620px,calc(100vh-20px))]`}>
      <div className="flexrounded-2xl border  bg-white shadow-md shadow-gray-700/50 mx-3 md:mx-6 my-7 min-h-[calc(100%-3.5rem)] rounded-3xl md:px-8 lg:px-20 relative">
        <div className="flex flex-col md:flex-row items-center lg:mt-[3vh]">
        
          <img className="bg-blue-500 border-4 border-gray-400 my-3 relative rounded-full w-44 h-44 md:h-56 md:w-56 mx-auto md:mx-0" src={userData.image} width={200} height={200} alt={userData.name} />
          <div className="text-center md:text-left text-black md:px-5 lg:px-10">
            <h1 className="text-2xl font-bold">
              {userData.name}
            </h1>
            <p className="my-2 mx-auto md:mx-0 text-xl leading-5 w-[93%] max-w-[450px]">
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
            href = "https://www.instagram.com/"
            extender = "@"
          >
            <AiOutlineInstagram />
          </CustomButtons>

          <CustomButtons
            text={`${userData.Linkedin}`}
            className="group-hover/edit:bg-gradient-to-b from-sky-400 to-sky-700 group-hover/edit:text-white group-hover/edit:shadow-sky-700/80"
            href="https://www.linkedin.com/in/"
          >
            <AiOutlineLinkedin />
          </CustomButtons>

          <CustomButtons
            text={`${userData.Twitter}`}
            className="group-hover/edit:bg-gradient-to-bl to-sky-400 from-blue-500  group-hover/edit:text-white group-hover/edit:shadow-sky-500/80"
            href= "https://twitter.com/"
            extender = "@"
          >
            <AiOutlineTwitter />
          </CustomButtons>
          <CustomButtons
            text={`${userData.Youtube}`}
            className="group-hover/edit:bg-[#ff0000] group-hover/edit:text-white group-hover/edit:shadow-red-500/80"
            href="https://www.youtube.com/"
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
        {userPronunce==="My" && <div className="absolute top-1 right-1 sm:top-5 sm:right-5 text-3xl text-black hover:bg-zinc-700 hover:text-white p-1.5 rounded-full cursor-pointer shadow-md hover:shadow-gray-500" onClick={()=>setEditBoxVisible(true)}>
          <AiOutlineEdit/>
        </div>}
      </div>
      {editBoxVisible===true && <EditUserPage userData={userData} close = {setEditBoxVisible}/>}
    </div>
  );
}

const CustomButtons = ({ text, href, className, children, extender }) => {
    var visualText = `${extender?"@":""}${text}`;
    if(visualText.slice(0,4) === "http") visualText = visualText.slice(visualText.indexOf("/")+2)
  return (
    <div className="text-center md:text-left group" >
      {text.length > 0 && (
        <a href={href+text?text:""} className="inline-block group/item">
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

