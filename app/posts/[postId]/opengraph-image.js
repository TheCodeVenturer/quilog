
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Post";

// Font

export const contentType = "image/png";



// Image generation
export default async function Image({ params: { postId } }) {
  const data = await fetch("https://quilog.vercel.app/api/post/" + postId)
  const post = await data.json()
  const createdAt = new Date(post.createdAt);
  const size = {
    width: 1200,
    height: 630,
  };

  return new ImageResponse(
    (
      <div
        tw={`flex flex-row-reverse h-full bg-neutral-800`}
        style={{
          backgroundImage: `url(https://raw.githubusercontent.com/TheCodeVenturer/blogHub/main/app/Images/backGround.png)`,
        }}
      >
        <div tw="flex items-center flex-col justify-center w-1/2 h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img tw="w-1/3 h-1/3" src="https://raw.githubusercontent.com/TheCodeVenturer/blogHub/main/app/icon.png" alt="Logo" />
          <h1 tw="text-7xl font-extrabold p-0 m-0">QUILOG</h1>
          <p tw="text-3xl p-0 m-0">Let{`'`}s blog it </p>
          <div
            tw="absolute left-[-80px] top-[-30px] w-[120px] h-[120%] bg-white/50"
            style={{ transform: "rotate(8deg)" }}
          />
        </div>
        <div tw="flex flex-col justify-center items-center w-1/2 h-full p-[48px] my-auto text-black bg-white/30 overflow-hidden">
          <h1 tw="text-5xl font-extrabold pb-2 border-b-4 border-zinc-400/50 leading-10">
            {post.title.length>29?post.title.slice(0,28)+"...":post.title}
          </h1>
          <p tw="m-0 p-0 ml-auto text-2xl">{`${createdAt.toLocaleTimeString()}` }</p>
          <p tw="m-0 p-0 ml-auto text-2xl">
          {` ${createdAt.toLocaleDateString(
            undefined,
            {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          )}`}
          </p>
          <p tw="w-[100%] m-3 text-2xl">published by,</p>
          <div tw="flex w-full items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.user.image}
              alt="user"
              tw="mr-5 bg-gray-500/40 border-2 border-gray-400 rounded-full w-40 h-40 shadow-xl shadow-gray-500/50"
              width={200}
              height={200}
            />
            <h1 tw="mr-auto flex text-6xl items-center h-full ">
              {post.user.name.length>12?post.user.name.slice(0,10)+"...":post.user.name}
            </h1>
          </div>
          <div tw="flex mt-5 items-center justify-around w-10/12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://raw.githubusercontent.com/TheCodeVenturer/blogHub/main/public/svg/like.png"
              alt="user"
              tw="bg-red-500 rounded-full w-14 h-14"
              width={200}
              height={200}
            />
            <h1 tw="flex text-4xl items-center h-full font-serif">
              {post.likedBy.length}
            </h1>
            <span tw="border-l-2 border-red-500 w-1 h-12"></span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://raw.githubusercontent.com/TheCodeVenturer/blogHub/main/public/svg/comment.png"
              alt="user"
              tw="bg-red-500 rounded-full w-14 h-14"
              width={100}
              height={100}
            />
            <h1 tw="flex text-5xl items-center h-full font-serif">
              {post.comments.length}
            </h1>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
