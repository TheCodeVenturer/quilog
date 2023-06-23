import { createElement } from "react"
import MarkDownToJSX from "./MarkDownToJSX"
export default function PostBottom({title,content,style}){
    return createElement(
        'div',
        {className:{style}},
        <>
        {title && <><h1 className=" my-2 text-[#f7cb90] text-5xl text-center">{title}</h1><hr className="border-0 border-b-2 rounded"/></>}
        <MarkDownToJSX content={content} suppressHydrationWarning={true}/></>
    )
}
