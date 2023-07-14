{/* eslint-disable-next-line @next/next/no-img-element */}

import { ImageResponse } from "next/server";
import db from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User";

export const dynamic = 'force-dynamic'


const websiteUrl = "http://localhost:3000";

const typewrB = fetch(new URL(`${websiteUrl}/fonts/TYPEWR_B.ttf`, import.meta.url)).then(
  (res) => res.arrayBuffer(),
);
const belanosimaRegular = fetch(new URL(`${websiteUrl}/fonts/Belanosima-Regular.ttf`, import.meta.url)).then(
  (res) => res.arrayBuffer(),
);
const ubuntuLight = fetch(new URL(`${websiteUrl}/fonts/Ubuntu-Light.ttf`, import.meta.url)).then(
  (res) => res.arrayBuffer(),
);



export async function GET(req) {
  const typewrBData = await typewrB;
  const belanosimaRegularData = await belanosimaRegular;
  const ubuntuLightData = await ubuntuLight;

  const options = {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'TypewriterB',
        data: typewrBData,
        style: 'normal',
      },
      {
        name: 'belanosimaRegular',
        data: belanosimaRegularData,
        style: 'regular',
      },
      {
        name: 'UbuntuLight',
        data: ubuntuLightData,
        style: 'regular',
      },
    ],
  }
  
  try {
    const queryObject = new URL(req.url).searchParams;
    const query = {};
    for (const [key, value] of queryObject.entries()) {
      query[key] = value;
    }

    await db.connect();
    // For Home Page which is at route ("/")
    if (Object.keys(query).length == 0) {
      return new ImageResponse(
        (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <h1 tw="text-4xl text-yellow-500 border-b-4 border-zinc-500/50">
                {"hello"}
              </h1>
            </div>
          </div>
        ),
        {...options}
        
      );
    }

    // For Post Page which is at route ("/post")

    if (query.postId) {
        const post = await Post.findOne({ _id: query.postId }).populate({
          path: "user",
          model: "User",
          select: "_id name image",
          options: { lean: true },
        });
        const createdAt = new Date(post.createdAt);
        return new ImageResponse(
          (<div tw={`flex flex-row-reverse h-full bg-neutral-800`} style={{backgroundImage: `url(${websiteUrl}/Images/backGround.png)`}}>
        <div tw="flex items-center flex-col justify-center w-1/2 h-full" >
          {/* eslint-disable-next-line @next/next/no-img-element */}
            <img tw="w-1/3 h-1/3" src={`${websiteUrl}/Images/Logo.png`} alt="Logo" />
            <h1 tw="text-[90px] font-extrabold p-0 m-0" style={{fontFamily: '"belanosimaRegular"',}}>QUILOG</h1>
            <p tw="text-3xl p-0 m-0" style={{fontFamily: '"UbuntuLight"',}}>Let{`'`}s blog it </p>
          <div
            tw="absolute left-[-80px] top-[-30px] w-[120px] h-[120%] bg-white"
            style={{ transform: "rotate(8deg)" }}
          />
        </div>
        <div tw="flex flex-col justify-center items-center w-1/2 h-full p-[48px] my-auto text-black bg-white overflow-hidden">
          <h1 tw="text-5xl font-extrabold pb-2 border-b-4 border-zinc-400/50 leading-10" style={{fontFamily: '"belanosimaRegular"',}}>{post.title}</h1>
          <p tw="m-0 p-0 ml-auto text-xl" style={{fontFamily: '"TypewriterB"',}}>{`${createdAt.toLocaleTimeString()} | ${createdAt.toLocaleDateString(
            undefined,
            {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          )}`}</p>
          <p tw="w-[100%] m-3 text-2xl" style={{fontFamily: '"UbuntuLight"',}}>published by,</p>
          <div tw="flex w-full items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
                  src={post.user.image}
                  alt="user"
                  tw="mr-5 bg-red-500 rounded-full w-40 h-40 shadow-xl shadow-gray-500/50"
                  width={200}
                  height={200}
                />
                <h1 tw="mr-auto flex text-6xl items-center h-full " style={{fontFamily: '"belanosimaRegular"',}}>
                  {post.user.name}
                </h1>
          </div>
          <div tw="flex mt-5 items-center justify-around w-10/12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                  src={`${websiteUrl}/svg/like.png`}
                  alt="user"
                  tw="bg-red-500 rounded-full w-10 h-10"
                  width={200}
                  height={200}
                />
                <h1 tw="flex text-4xl items-center h-full font-serif">
                  {post.likedBy.length}
                </h1>
                <span tw="border-l-2 border-red-500 w-1 h-12"></span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${websiteUrl}/svg/comment.png`}
                  alt="user"
                  tw="bg-red-500 rounded-full w-10 h-10"
                  width={100}
                  height={100}
                />
                <h1 tw="flex text-4xl items-center h-full font-serif">
                  {post.comments.length}
                </h1>
          </div>
        </div>
      </div>),
      // {debug: true},
      {...options}
        )
    }


    // For User Page which is at route ("/user")
    if (query.userId) {
      const user = await User.findOne({ _id: query.userId }).select("_id name image likedPosts posts bio").lean(true);
      let name = user.name;
      name = name.split(" ")[0]
      if (name.length > 10) {
        name = `${name.slice(0, 10)}...`;
      }
      return new ImageResponse(
        (<div tw={`flex flex-row-reverse h-full bg-neutral-800`} style={{backgroundImage: `url(${websiteUrl}/Images/backGround.png)`}}>
      <div tw="flex items-center flex-col justify-center w-1/2 h-full" >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img tw="w-1/3 h-1/3" src={`${websiteUrl}/Images/Logo.png`} alt="Logo" />
            <h1 tw="text-[90px] font-extrabold p-0 m-0" style={{fontFamily: '"belanosimaRegular"',}}>QUILOG</h1>
            <p tw="text-3xl p-0 m-0" style={{fontFamily: '"UbuntuLight"',}}>Let{`'`}s blog it </p>
        <div
          tw="absolute left-[-80px] top-[-30px] w-[120px] h-[120%] bg-white"
          style={{ transform: "rotate(8deg)" }}
        />
      </div>
      <div tw="flex flex-col justify-center items-center w-1/2 h-full p-[48px] my-auto text-black bg-white overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.image}
          alt="user"
          tw="mx-auto bg-red-500 rounded-full w-60 h-60"
          width={200}
          height={200}
        />
        <h1 tw="m-0 mx-auto text-6xl border-b-4 border-zinc-400/50" style={{fontFamily: '"belanosimaRegular"',}}>{user.name}</h1>
        {user.bio && <p tw="text-white text-[25px] m-0 mt-2 p-0 text-center  leading-8" style={{fontFamily: '"UbuntuLight"',}}>{user.bio}</p>}
        <hr tw="w-full bg-zinc-300/20 h-1 rounded-xl"/>
        <p tw="w-full text-[30px] m-2 h-fit" style={{fontFamily: '"TypewriterB"',}}>{`${name}'s Created Posts = ${user.posts.length}` }</p>
        <p tw="w-full text-[30px] m-2 h-fit" style={{fontFamily: '"TypewriterB"',}}>{`${name}'s Liked Posts = ${user.likedPosts.length}`}</p>
      </div>
    </div>),
    // {debug: true},
    {...options}
    
      )
    }
  } catch (err) {}
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <h1 tw="text-3xl text-yellow-500 border-b-4 border-zinc-500/50">
            {post.title}
          </h1>
        </div>
      </div>
    )
  );
}
