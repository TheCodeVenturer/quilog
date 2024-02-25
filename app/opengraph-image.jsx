
import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Quilog HomePage'


// Font


export const contentType = 'image/png'
 

// Image generation
export default async function Image() {

  const size = {
    width: 1200,
    height: 630,
  };


  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
            tw={`flex flex-row-reverse h-full bg-neutral-800`}
            style={{
              backgroundImage: `url(https://raw.githubusercontent.com/TheCodeVenturer/blogHub/main/app/Images/backGround.png)`,
            }}
          >
            <div tw="flex items-center flex-col justify-center w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img tw="w-60 h-60" src={`https://raw.githubusercontent.com/TheCodeVenturer/blogHub/main/app/icon.png`} alt="Logo"/>
              <h1
                tw="font-extrabold p-0 m-0 text-8xl"
              >
                QUILOG
              </h1>
              <p tw="text-5xl p-0 m-0 font-bold" >
                Let{`'`}s blog it{" "}
              </p>
              <p tw="w-[70%] text-3xl text-center font-semibold">{`Quilog a blogger choice blogging app for your personal blog. Whether you're a travel enthusiast, a tech guru, a developer, or a fashion aficionado, QuiLog is the perfect platform to amplify your voice and share your expertise.`}</p>
            </div>
          </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}