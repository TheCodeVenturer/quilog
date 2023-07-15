"use client";
import { useAppState } from "./context/stateContext";
import Link from "next/link";
import Image from "next/image";

import {AiOutlinePlus} from "react-icons/ai";
import {CiRead} from "react-icons/ci";

export const dynamic = "force-static";

export default function Home() {
  const { session, status } = useAppState();
  return (
    <div
      className={`flex items-center flex-col justify-center mt-[100px] md:mt-0 text-black h-[calc(100vh-200px)] md:h-[calc(100vh-60px)] w-[85vw] max-w-[1000px] mx-auto`}
    >
      <h1 className="w-full md:w-[70%] self-start text-4xl md:text-5xl">{`"The secret to getting ahead is getting started."`}</h1>
      <div className="flex flex-col md:flex-row items-center justify-around max-w-[1000px] w-[95vw] md:mt-10">
        <div className="md:flex-col flex-row">
          <Link href="/posts">
              <button className="flex items-center text-xl font-semibold p-3 px-6 w-[200px] bg-white rounded-full shadow-md shadow-gray-400/50 hover:shadow-lg my-2 md:my-5"><CiRead className="inline-block p-[1px] text-3xl"/>Read Blog</button>
            </Link>
          
          {status === "authenticated" && (
            <Link href="/newPost">
            <button className="flex items-center text-xl font-semibold p-3 px-6 w-[200px] bg-white rounded-full shadow-md shadow-gray-400/50 hover:shadow-lg my-2 md:my-5"><AiOutlinePlus className="inline-block p-[1px] text-3xl"/>Create Blog</button>
          </Link>
          )}
        </div>
        <Image
          src="/Images/coder Image.png"
          width={400}
          height={400}
          alt="Coder"
        />
      </div>
    </div>
  );
}
