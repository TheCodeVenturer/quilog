import Link from "next/link";
import Image from "next/image";
import ReactToMarkDown from "./ReactToMarkDown";
import {AiOutlineShareAlt} from "react-icons/ai";
export default function PostBox({post}) {
  console.log(post);
  return (
    <div className="rounded-xl bg-red-500 w-[90%] sm:w-[400px] md:w-[700px] m-auto my-5 p-4 h-fit overflow-hidden relative ">
    <div className="flex justify-between">
        <Link className="w-fit mx-2 flex items-center" href={`/${post.user._id}`}>
          <Image className="w-9 h-9 bg-black rounded-full" src={`${post.user.image}`} height={100} width = {100} alt={`${post.user.username}`}/>
          <p className="ml-3 font-bold text-md">{post.user.username}</p>
        </Link>
        <button className="text-3xl p-2 rounded-full hover:bg-zinc-400/20 md:mr-4">
          <AiOutlineShareAlt />
        </button>
    </div>

      <div className="text-black border-b-2 border-yellow-400 mt-2"></div>
      <Link href={`/posts/${post._id}`}>
        <div className="mt-2 p-2 h-96 md:mt-3 md:p-3 after:absolute after:w-[100%] after:h-[40%] after:bg-slate-500 after:bottom-0 after:left-0 after:opacity-40">
        <ReactToMarkDown content={post.data}/>
          <div className="ml-1 border-dotted border-b-4 w-5 h-4 inline-block border-red-950"></div>
        </div>
      </Link>
    </div>
  );
}
