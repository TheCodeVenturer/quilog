import Link from "next/link";
export default function PostBox({text}) {
    const postData = text || "hello hello"
  return (
    <div className="rounded-xl bg-red-500 w-72 sm:w-[400px] md:w-[600px] m-auto my-5 p-4 h-fit overflow-hidden relative after:absolute after:w-[100%] after:h-[30%] after:bg-slate-500 after:bottom-0 after:left-0 after:opacity-40">
        <Link className="w-fit mx-2 flex items-center" href="#">
          <div className="w-9 h-9 bg-black rounded-full"></div>
          <p className="ml-3 font-bold text-md">User</p>
        </Link>

      <div className="text-black border-b-2 border-yellow-400 mt-2"></div>
      <Link href="#">
        <div className="mt-2 p-2 md:mt-3 md:p-3">
          {postData}
          <div className="ml-1 border-dotted border-b-4 w-5 h-4 inline-block border-red-950"></div>
        </div>
      </Link>
    </div>
  );
}
