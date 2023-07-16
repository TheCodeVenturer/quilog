"use client";
import { useState } from "react";

import toast from "react-hot-toast";

import { useAppState } from "@/app/context/stateContext";
import { redirect, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { PiEyeClosed, PiEye } from "react-icons/pi";
import { FcCancel } from "react-icons/fc";
import { AiOutlineCheckCircle } from "react-icons/ai";

export const dynamic = "force-static";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { session, status } = useAppState();
  const router = useRouter();

  const handleSubmit = async (e) => {
    const userData = { name, email, password };
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const responseData = await res.json();
    if (responseData.error === "exists") toast.error("User already exists");
    else if (responseData.error) toast.error("Something Went Wrong");
    else {
      router.push("/account/login");
      toast.success("Account Created Successfully");
    }
    setName("");
    setEmail("");
    setPassword("");
    setCheckPassword("");
    setPasswordVisibility(false);
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (status === "authenticated") {
    redirect("/");
  }
  return (
    <div
      className={`flex items-center flex-col-reverse md:flex-row justify-center text-black h-[calc(100vh-200px)] md:h-[calc(100vh-60px)] w-[85vw] max-w-[1000px] mx-auto`}
    >
      <div className="md:w-[40%] md:mx-[5%] px-[2%] md:px-[5%] bg-white pt-10 border border-gray-500/30 rounded-lg shadow-xl shadow-gray-400/30 h-[450px]">
        <h2 className="text-2xl font-bold tracking-wider">Create an account</h2>
        <h3 className="text-lg mt-1 mb-5">Let{`'`}s blog it with Quilog</h3>
        <input
          className="text-black pr-[10%] w-full border-b border-zinc-400/80 outline-0 border-0 bg-transparent my-2 text-base"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          autoFocus
        />
        <input
          className={`pr-[10%] w-full border-b border-zinc-400/80 outline-0 border-0 bg-transparent my-2 text-base ${
            emailRegex.test(email) ? "text-black" : "text-red-500"
          }`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoFocus
        />
        <div className="border-b border-zinc-400/80 flex items-center flex-row my-2">
          <input
            className="text-black w-[90%]  outline-0 border-0 bg-transparent text-base"
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
        <input
          className={`w-[100%] pr-[10%] outline-0 border-0 bg-transparent border-b border-zinc-400/80 text-base ${
            password != checkPassword ? "text-red-500" : "text-black"
          } mt-2`}
          type="text"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
          placeholder="Re-Enter Password"
        />
        <PasswordText password={password} />
        <div className="text-center ">
          <button
            onClick={handleSubmit}
            className="text-black mt-14 w-full border border-zinc-500/50 rounded-md text-lg font-semibold hover:shadow-lg hover:shadow-gray-500/30 disabled:text-gray-500 "
            disabled={
              isStrongPassword(password) != 0 ||
              password !== checkPassword ||
              !emailRegex.test(email) ||
              name.length === 0
            }
          >
            Register
          </button>
          <p className="text-xs mt-2 mb-2">
            Already have an account?
            <Link href="/account/login" className="text-blue-500">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="md:w-1/2 text-center h-[420px] flex flex-col justify-center">
        <h1 className="text-6xl tracking-wider font-bold">{`Let's Blog It`}</h1>
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

function PasswordText({ password }) {
  if (password.length == 0)
    return <p className="text-xs mt-1 text-center text-green-500 h-4" />;
  const arr = [
    "Password must be 8 characters long",
    "Password must have a uppercase letter",
    "Password must have a lowercase letter",
    "Password must have a digit",
  ];
  const passwordStrengthCategory = isStrongPassword(password);
  if (passwordStrengthCategory === 0)
    return (
      <p className="text-xs mt-1 text-center text-green-500 ">
        <AiOutlineCheckCircle className="inline-block" /> Password is Strong
      </p>
    );
  return (
    <p className="text-xs mt-1 text-center text-red-500">
      <FcCancel className="inline-block" />
      {passwordStrengthCategory == 1 && arr[0]}
      {passwordStrengthCategory == 2 && arr[1]}
      {passwordStrengthCategory == 3 && arr[2]}
      {passwordStrengthCategory == 4 && arr[3]}
    </p>
  );
}

function isStrongPassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);

  if (password.length < minLength) return 1;
  if (!hasUppercase) return 2;
  if (!hasLowercase) return 3;
  if (!hasDigit) return 4;
  return 0;
}
