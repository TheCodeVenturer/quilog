"use client";

import Image from "next/image";
import { useAppState } from "../context/stateContext";

import { signOut } from "next-auth/react";

import Link from "next/link";

export const dynamic = "force-static";

export const NavBar = ({classes}) => {
  const { session, user, status } = useAppState();
  return (
    <nav className={`w-full z-10 bg-transparent shadow-gray-600/20 fixed left-0 top-0 border-gray-400 text-black py-2 md:py-3 h-[53px] md:h-[62px] ${classes}`}>
      <div className="m-auto flex flex-row max-w-[1200px] justify-between w-full items-center px-4">
        <Link className="flex flex-row items-center" href="/">
          <Image
            src="/icon.png"
            width={50}
            height={50}
            alt="logo"
            className="w-9 h-9"
          />
          <p className="hidden md:block text-xl font-extrabold p-0 m-0 pl-2">
            Quilog
          </p>
        </Link>
        {status === "loading" ? (
          <SkeletonForUser />
        ) : status === "authenticated" ? (
          user && user.name && user.image ? (
            <div className="flex items-center justify-end w-44 h-full p-0 group relative ">
              <p className="font-bold text-lg mr-4 cursor-pointer">{`Hello, ${
                user.name.split(" ")[0].length > 7
                  ? user.name.slice(0, 6) + "..."
                  : user.name.split(" ")[0]
              }`}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={user.name}
                src={user.image}
                width={100}
                height={100}
                className="rounded-full bg-white border-2 border-gray-400/70 shadow-lg w-10 md:w-12 h-10 md:h-12 cursor-pointer"
              />
              <div className="hidden group-hover:block absolute top-[49px] right-2 w-22 h-auto bg-zinc-500/60 backdrop-filter backdrop-blur-sm rounded-md shadow-lg p-2 text-black font-semibold">
                <Link
                  href={`/${session.user.id}`}
                  className="hover:text-white hover:underline"
                >
                  My Account
                </Link>
                <div
                  className="cursor-pointer hover:text-white hover:underline border-t-2 border-gray-200"
                  onClick={() => signOut()}
                >
                  signOut
                </div>
              </div>
            </div>
          ) : (
            <SkeletonForUser />
          )
        ) : (
          <div className="font-semibold">
            <Link href="/account/login" className="hover:underline ">
              Login
            </Link>
            {` or `}
            <Link href="/account/register" className="hover:underline">
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

function SkeletonForUser() {
  return (
    <div className="flex items-center justify-end w-44 h-full p-0 animate-pulse">
      <div className="rounded-md bg-gray-400/50  shadow-lg w-3/4 h-5 mr-2" />
      <div className="rounded-full border-2 border-gray-400/70 bg-gray-400/50 shadow-lg w-10 md:w-12 h-10 md:h-12 " />
    </div>
  );
}

export const NavBarForAccount = () => {
  return (
    <nav className="w-full z-10 bg-transparent backdrop-filter shadow-gray-600/20 fixed left-0 top-0 border-gray-400 text-black py-1 md:py-5 h-[53px] md:h-[57px]">
      <div className="m-auto md:px-2 flex flex-row max-w-[1200px] justify-between w-full items-center px-2">
        <Link className="flex flex-row items-center" href="/">
          <Image
            src="/icon.png"
            width={50}
            height={50}
            alt="logo"
            className="w-10.5 md:w-9 h-10.5 md:h-9"
          />
          <p className="hidden md:block text-xl font-extrabold p-0 m-0 pl-2">
            Quilog
          </p>
        </Link>
      </div>
    </nav>
  );
};
