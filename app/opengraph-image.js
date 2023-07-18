// import { ImageResponse } from 'next/server'
 
// // Route segment config
// export const runtime = 'edge'
 
// // Image metadata
// export const size = {
//   width: 1200,
//   height: 630,
// }
 
// export const contentType = 'image/png'

// export const dynamic = "force-dynamic";

// const websiteUrl = "https://quilog.vercel.app/";

// const typewrB = fetch(
//   new URL(`https://github.com/TheCodeVenturer/blogHub/blob/main/public/fonts/TYPEWR_B.ttf`, import.meta.url)
// ).then((res) => res.arrayBuffer());
// const belanosimaRegular = fetch(
//   new URL(`https://github.com/TheCodeVenturer/blogHub/blob/main/public/fonts/Belanosima-Regular.ttf`, import.meta.url)
// ).then((res) => res.arrayBuffer());
// const ubuntuLight = fetch(
//   new URL(`https://github.com/TheCodeVenturer/blogHub/blob/main/public/fonts/Ubuntu-Light.ttf`, import.meta.url)
// ).then((res) => res.arrayBuffer());

// export default async function Image() {
//   const typewrBData = await typewrB;
//   const belanosimaRegularData = await belanosimaRegular;
//   const ubuntuLightData = await ubuntuLight;

//   const options = {
//     width: 1200,
//     height: 630,
//     fonts: [
//       {
//         name: "TypewriterB",
//         data: typewrBData,
//         style: "normal",
//       },
//       {
//         name: "belanosimaRegular",
//         data: belanosimaRegularData,
//         style: "regular",
//       },
//       {
//         name: "UbuntuLight",
//         data: ubuntuLightData,
//         style: "regular",
//       },
//     ],
//   };

//   return new ImageResponse(
//     (
//       <div
//         tw={`flex flex-row-reverse h-full bg-neutral-800 bg-red`}
//         style={{
//           backgroundImage: `url(${websiteUrl}/Images/backGround.png)`,
//         }}
//       >
//         <div tw="flex items-center flex-col justify-center w-full h-full">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img tw="w-60 h-60" src={`${websiteUrl}/icon.png`} alt="Logo" />
//           <h1
//             tw="font-extrabold p-0 m-0 text-8xl"
//             style={{ fontFamily: '"belanosimaRegular"' }}
//           >
//             QUILOG
//           </h1>
//           <p
//             tw="text-5xl p-0 m-0 font-bold"
//             style={{ fontFamily: '"UbuntuLight"' }}
//           >
//             Let{`'`}s blog it{" "}
//           </p>
//           <p
//             tw="w-[70%] text-3xl text-center font-semibold"
//             style={{ fontFamily: '"UbuntuLight"' }}
//           >{`Quilog a blogger choice blogging app for your personal blog. Whether you're a travel enthusiast, a tech guru, a developer, or a fashion aficionado, QuiLog is the perfect platform to amplify your voice and share your expertise.`}</p>
//         </div>
//       </div>
//     ),
//     { ...options }
//   );
// }
