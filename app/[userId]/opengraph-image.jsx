import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Profile Picture";

// Font

export const contentType = "image/png";

// Image generation
export default async function Image({ params: { userId } }) {
  const data = await fetch("https://quilog.vercel.app/api/" + userId);
  const user = await data.json();
  const size = {
    width: 1200,
    height: 630,
  };
  let name = user.name;
  name = name.split(" ")[0];
  if (name.length > 10) {
    name = `${name.slice(0, 10)}...`;
  }

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
          <h1 tw="text-[90px] font-extrabold p-0 m-0">QUILOG</h1>
          <p tw="text-3xl p-0 m-0">Let{`'`}s blog it </p>
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
          <h1 tw="m-0 mx-auto text-6xl border-b-4 border-zinc-400/50">
            {user.name}
          </h1>
          {user.bio && (
            <p tw="text-white text-[25px] m-0 mt-2 p-0 text-center  leading-8">
              {user.bio}
            </p>
          )}
          <hr tw="w-full bg-zinc-300/20 h-1 rounded-xl" />
          <p tw="w-full text-[30px] m-2 h-fit">{`${name}'s Created Posts = ${user.totalPosts}`}</p>
          <p
            tw="w-full text-[30px] m-2 h-fit"
          >{`${name}'s Liked Posts = ${user.totalLikedPosts}`}</p>
        </div>
      </div>
    ),
    // {debug: true},
    { ...size }
  );
}
