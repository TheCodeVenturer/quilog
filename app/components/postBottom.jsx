import MDComponents from "./MDComponents"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReactToMarkDown from "./ReactToMarkDown";
import React from "react";
export default function PostBottom({title,content,style}){
    return(
        <div className={style}>
            {title && <><h1 className=" my-2 text-[#f7cb90] text-5xl text-center">{title}</h1><hr className="border-0 border-b-2 rounded"/></>}
            <ReactToMarkDown content={content}/>
        </div>
    )
}
