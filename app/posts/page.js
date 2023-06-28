'use client'
import { useEffect,useState } from "react";
import PostBox from "../components/post";

import InfiniteScroll from "react-infinite-scroll-component";

import { useSearchParams } from "next/navigation";


export default function Page(){

    const [pageNo,setPageNo] = useState(1)
    const [postArray,setPostArray] = useState([])
    const [loading,setLoading] = useState(true)
    const [totalPosts,setTotalPosts] = useState(0)

    const searchParams = useSearchParams()
    
    async function fetchPosts() {
        var searchQueries = ""
        if(searchParams.has("likedPost")){
            searchQueries = searchQueries + `&likedPost=${searchParams.get("likedPost")}`
        }
        if(searchParams.has("userId")){
            searchQueries = searchQueries + `&userId=${searchParams.get("userId")}`
        }
        const fetchedPost = await fetch(`/api/post?pageNo=${pageNo}${searchQueries}`);
        const data = await fetchedPost.json();
        if(pageNo==1) setTotalPosts(data.count)
        console.log(data);
        setPostArray([...postArray,...data.posts])
        setPageNo(pageNo+1)
    }
    useEffect(()=>{
        const fetchInitialPosts = async ()=>{
            await fetchPosts()
        }
        fetchInitialPosts()
    },[])
    
    
    return(
        <div>
        <InfiniteScroll
          dataLength={postArray.length}
          next={fetchPosts}
          hasMore={postArray.length<totalPosts}
          loader={<h4>Loading...</h4>}
        >
        {
            postArray.map((post)=>{
                return(
                    <PostBox key={post._id} post={post}/>
                )
            })
        }
        </InfiniteScroll>
        </div>
    )
}

