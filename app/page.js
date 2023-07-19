"use client";
import { useAppState } from "./context/stateContext";
import Link from "next/link";
import Image from "next/image";

import {AiOutlinePlus} from "react-icons/ai";
import {CiRead} from "react-icons/ci";



export default function Home() {
  const { session, status } = useAppState();
  return (
    <div
      className={`flex items-center flex-col justify-center mt-[100px] md:mt-0 text-black h-[calc(100vh-200px)] md:h-[calc(100vh-65px)] w-[85vw] max-w-[1000px] mx-auto`}
    >
      <h1 className="md:ml-12 mb-6 md:mb-0 w-full md:w-[70%] self-start text-4xl md:text-5xl pt-6 md:pt-10 font-semibold leading-10">{`"The secret to getting ahead is getting started."`}</h1>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-[1000px] w-[95vw]">
        <div className="flex flex-col w-full items-center justify-center md:relative md:-top-10">
          <Link href="/posts" >
              <button className="flex items-center text-xl font-semibold p-3 px-4 w-[200px] bg-white rounded-full shadow-md shadow-gray-400/50 hover:shadow-lg my-2 md:my-5"><CiRead className="inline-block p-[1px] text-3xl mx-2"/>Read Blog</button>
          </Link>
          
          {status === "authenticated" && (
            <Link href="/newPost">
            <button className="flex items-center text-xl font-semibold p-3 px-4 w-[200px] bg-white rounded-full shadow-md shadow-gray-400/50 hover:shadow-lg my-2 md:my-5"><AiOutlinePlus className="inline-block p-[1px] text-3xl mx-1 mr-2"/>Create Blog</button>
          </Link>
          )}
        </div>
        <Image
          src="https://raw.githubusercontent.com/TheCodeVenturer/blogHub/main/app/Images/Coder%20Image.png"
          width={500}
          height={500}
          alt="Coder"
        />
      </div>
    </div>
  );
}
