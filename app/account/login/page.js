"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

import toast from "react-hot-toast";

import { useAppState } from "@/app/context/stateContext";
import { redirect,useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { PiEyeClosed, PiEye } from "react-icons/pi";

export const dynamic = "force-static";



export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [password, setPassword] = useState("");
  const { session, status } = useAppState();
  const handleSubmit = async (e) => {
    const payload = { email, password };
    const response = await signIn("credentials", {
      redirect: false,
      ...payload,
    });
    console.log(response);
    setEmail("");
    setPassword("");
    if (response.error === "Invalid credentials") 
      toast.error("Invalid credentials");
  };

  if (status === "authenticated") {
    redirect("/");
  }
  return (
    <div
      className={`flex items-center flex-col-reverse md:flex-row justify-center text-black h-[calc(100vh-200px)] md:h-[calc(100vh-60px)] w-[85vw] max-w-[1000px] mx-auto`}
    >
      <div className="md:w-1/2 md:mx-[8%] px-[3%] bg-white pt-14 border border-gray-500/30 rounded-lg shadow-xl shadow-gray-400/30 h-[450px]">
        <h2 className="text-2xl font-bold tracking-wider">Welcome</h2>
        <h3 className="text-lg mt-1 mb-5">Login to your account</h3>
        <input
          className="text-black pr-[10%] w-full border-b border-zinc-700/80 outline-0 border-0 bg-transparent my-2 text-lg"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          autoFocus
        />
        <div className="border-b border-zinc-700/80 flex items-center flex-row mt-2 mb-20">
          <input
            className="text-black w-[90%]  outline-0 border-0 bg-transparent"
            type={passwordVisibility === true ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <span
            className="text-black text-xl cursor-pointer "
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          >
            {passwordVisibility === true ? <PiEyeClosed /> : <PiEye />}
          </span>
        </div>
        <div className="text-center ">
          <button
            onClick={handleSubmit}
            className="text-black mt-20 w-full border border-zinc-500/50 rounded-md text-lg font-semibold hover:shadow-lg disabled:text-gray-500"
            disabled={!email || !password}
          >
            Login
          </button>
          <p className="text-xs mt-1 mb-2">
            Don{`'`}t have an account?
            <Link href="/account/register" className="text-blue-500">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="md:w-1/2 text-center h-[420px] flex flex-col justify-center">
        <h1 className="text-3xl tracking-wider font-bold">{`Let's Blog It`}</h1>
        <Image
          src="/Images/Coder Image.png"
          width={500}
          height={500}
          alt="Coder Image"
          className="hidden md:block"
        />
      </div>
    </div>
  );
}


{
  /* <button onClick={handleSubmit} className="text-black mt-14 w-full border border-zinc-500/50 rounded-md text-lg font-semibold hover:shadow-lg hover:shadow-gray-500/30 disabled:text-gray-500 " disabled = {! isStrongPassword(password)}>Login</button> */
}
