"use client";

import Compressor from "compressorjs";

import toast from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { useAppState } from "../context/stateContext";

export const dynamic = 'force-dynamic'

import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineGlobal,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineCamera
} from "react-icons/ai";

import { RxCross2 } from "react-icons/rx";

import { useRouter } from "next/navigation";

export default function EditUserPage({ userData, close }) {
  const router = useRouter();
  const { session, status, user,setUser } = useAppState();
  const [updatdUser, setUpdatedUser] = useState(userData);
  const [imageURL, setImageURL] = useState(userData.image);

  const handleTextArea = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 135) {
      setUpdatedUser((prev) => ({ ...prev, bio: inputValue }));
    }
  };
  const handlenameChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setUpdatedUser((prev) => ({ ...prev, name: inputValue }));
    }
  };
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const profileImg = event.target.files[0];
      if(profileImg.size> 5000000){
        toast.error("reduce file size under 1mb")
        return
      }
      if(profileImg.type==="image/png" || profileImg.type==="image/jpeg"){
        let quality=1
        if(profileImg.size>900000)
          quality = 500000/profileImg.size
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result;
          setUpdatedUser((prev) => ({ ...prev, image: base64String }));
        };
        new Compressor(profileImg, {
          quality:quality,
          success(reducedProfileImg) {
            reader.readAsDataURL(reducedProfileImg);
            setImageURL(URL.createObjectURL(reducedProfileImg));

        }})
      }
      else{
        toast.error("please Select an Image")
      }
    }
  };
  const handleSave = async () => {
    const res = await fetch(`/api/${session.user.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatdUser),
    });
    if(res.status===200){
      setUser({...user,name:updatdUser.name,image:updatdUser.image})
      toast.success("User Data Updated")
      
      router.refresh()
      close(false)

    }
  }
  return (
    <div className=" border  bg-white shadow-md shadow-gray-700/50 mx-3 md:mx-6 my-4 md:my-7 min-h-[calc(100%-3.5rem)] w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] md:rounded-3xl md:px-8 lg:px-20 absolute top-0 left-0 z-10">
      <div className="md:flex md:flex-row items-center lg:mt-[3vh]">
        <div
          className="bg-blue-500 border-4 border-gray-400 my-3 rounded-full w-40 h-40 md:h-56 md:w-56 mx-auto md:mx-0 bg-cover bg-center bg-fit"
          style={{ backgroundImage: `url(${imageURL})` }}
        >
          <label htmlFor="profileImg" className="cursor-pointer text-black text-[6rem] h-full w-full flex justify-center items-center bg-gray-500/30 hover:bg-gray-500/50 rounded-full group"><AiOutlineCamera className="p-2 bg-gray-600/10 rounded-full group-hover:bg-gray-600/20"/></label>
          <input type="file" name="myImage" id="profileImg" accept="image/png, image/jpeg" onChange={uploadToClient} className="hidden"/>
        </div>

        <div className="md:w-[50%] ml-[5%] text-black flex flex-col">
          <input
            className={` mx-auto w-full h-10 max-w-[320px] text-2xl font-bold p-1.5 shadow-md mb-2 bg-gray-200/60 rounded-3xl outline-0 ${
              updatdUser.name.length < 20 ? "caret-blue-600" : "caret-red-500"
            }`}
            maxLength={20}
            onChange={handlenameChange}
            value={updatdUser.name}
            placeholder="Name"
          />
          <textarea
            className={`w-full max-w-[320px] p-1.5 resize-none my-2 mx-auto md:mx-0 text-lg leading-5 h-28 shadow-md bg-gray-200/60 rounded-3xl outline-0 ${
              updatdUser.bio.length < 135 ? "caret-blue-600" : "caret-red-500"
            } scroll-smooth overflow-y-hidden`}
            maxLength={135}
            onChange={handleTextArea}
            value={updatdUser.bio}
            placeholder="Bio"
          />
        </div>
      </div>
      {/* Social Section Starts here */}
      <div className="flex justify-between flex-col px-5 text-3xl sm:text-4xl lg:mt-[1vh] text-black">
        <div className="text-center md:text-left group">
            <div className="inline-block group/item">
              <span className="flex items-center group/edit">
                <span
                  className={`p-1 group-hover/edit:shadow-lg group-hover/edit:bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 group-hover/edit:text-white group-hover/edit:shadow-pink-500/80 rounded-full`}
                >
                  <AiOutlineInstagram />
                </span>
                <input className="ml-1 p-1 px-2 text-lg sm:text-xl w-10/12 max-w-[300px] shadow bg-gray-200/60 rounded-3xl outline-0" value={updatdUser.Instagram} 
                onChange={(e) => setUpdatedUser((prev) => ({ ...prev, Instagram: e.target.value }))} placeholder="thecodeventurer"/>
              </span>
            </div>
        </div>
        <div className="text-center md:text-left group">
            <div className="inline-block group/item">
              <span className="flex items-center group/edit">
                <span
                  className={`p-1 group-hover/edit:shadow-lg group-hover/edit:bg-gradient-to-b from-sky-400 to-sky-700 group-hover/edit:text-white group-hover/edit:shadow-sky-700/80 rounded-full`}
                >
                  <AiOutlineLinkedin />
                </span>
                <input className="ml-1 p-1 px-2 text-lg sm:text-xl w-10/12 max-w-[300px] shadow bg-gray-200/60 rounded-3xl outline-0" value={updatdUser.Linkedin} 
                onChange={(e) => setUpdatedUser((prev) => ({ ...prev, Linkedin: e.target.value }))} placeholder="thecodeventurer"/>
              </span>
            </div>
        </div>
        <div className="text-center md:text-left group">
            <div className="inline-block group/item">
              <span className="flex items-center group/edit">
                <span
                  className={`p-1 group-hover/edit:shadow-lg group-hover/edit:bg-gradient-to-bl to-sky-400 from-blue-500  group-hover/edit:text-white group-hover/edit:shadow-sky-500/80 rounded-full`}
                >
                  <AiOutlineTwitter />
                </span>
                <input className="ml-1 p-1 px-2 text-lg sm:text-xl w-10/12 max-w-[300px] shadow bg-gray-200/60 rounded-3xl outline-0" value={updatdUser.Twitter} 
                onChange={(e) => setUpdatedUser((prev) => ({ ...prev, Twitter: e.target.value }))} placeholder="thecodeventurer"/>
              </span>
            </div>
        </div>
        <div className="text-center md:text-left group">
            <div className="inline-block group/item">
              <span className="flex items-center group/edit">
                <span
                  className={`p-1 group-hover/edit:shadow-lg group-hover/edit:bg-[#ff0000] group-hover/edit:text-white group-hover/edit:shadow-red-500/80 rounded-full`}
                >
                  <AiOutlineYoutube />
                </span>
                <input className="ml-1 p-1 px-2 text-lg sm:text-xl w-10/12 max-w-[300px] shadow bg-gray-200/60 rounded-3xl outline-0" value={updatdUser.Youtube} 
                onChange={(e) => setUpdatedUser((prev) => ({ ...prev, Youtube: e.target.value }))} placeholder="@thecodeventurer"/>
              </span>
            </div>
        </div>
        <div className="text-center md:text-left group">
            <div className="inline-block group/item">
              <span className="flex items-center group/edit">
                <span
                  className={`p-1 group-hover/edit:shadow-lg group-hover/edit:bg-gradient-radial from-gray-800 to-gray-900 group-hover/edit:text-white group-hover/edit:shadow-gray-800/80 rounded-full`}
                >
                  <AiOutlineGlobal />
                </span>
                <input className="ml-1 p-1 px-2 text-lg sm:text-xl w-10/12 max-w-[300px] shadow bg-gray-200/60 rounded-3xl outline-0" value={updatdUser.Website} 
                onChange={(e) => setUpdatedUser((prev) => ({ ...prev, Website: e.target.value }))} placeholder="https://thecodeventurer.github.io"/>
              </span>
            </div>
        </div>
      </div>
      {/* Social Section Ends here */}
      <div className="flex justify-center md:justify-end mb-2">
        <button
          className="bg-gradient-to-br from-blue-500 to-sky-400 text-white text-2xl font-bold p-2 px-4 rounded-3xl shadow-md hover:shadow-lg hover:shadow-gray-400"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <div
        className="absolute top-5 right-5 text-3xl text-black hover:bg-zinc-700 hover:text-white p-1.5 rounded-full cursor-pointer shadow-md hover:shadow-gray-500"
        onClick={() => close(false)}
      >
        <RxCross2 />
      </div>
    </div>
  );
}
