import db from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User";
import { resolve } from "styled-jsx/css";


export async function GET(req) {
  try {
    const queryObject = new URL(req.url).searchParams;
    const query = {};
    for (const [key, value] of queryObject.entries()) {
      query[key] = value;
    }
    if (!query.pageNo) {
      throw new Error("Page number not provided");
    }
    const pageNo = parseInt(query.pageNo);
    const itemsPerPage = 4;
    const skip = (pageNo - 1) * itemsPerPage;

    var dataToUser = {};
    await db.connect();
    if (!query.userId) {
      const dataArray = await Post.find()
        .skip(skip)
        .limit(itemsPerPage)
        .select("_id user title data updatedAt likedBy comments")
        .populate({
          path: "user",
          model: "User",
          select: "_id name image",
          options: { lean: true },
        })
        .sort({ updatedAt: -1 });
      dataToUser = { posts: dataArray };
      if (pageNo == 1) {
        const count = await Post.countDocuments();
        dataToUser["count"] = count;
      }
    } else if (!query.likedPost) {
      const dataArray = await User.findOne({ _id: query.userId }).populate({
        path: "posts",
        model: "Post",
        options: {
          skip: skip,
          limit: itemsPerPage,
          lean: true,
          select: "_id title data updatedAt likedBy comments",
          sort: { updatedAt: -1 },
        },
      });
      const user = {
        _id: dataArray._id,
        name: dataArray.name,
        image: dataArray.image,
      };
      const posts = dataArray.posts.map((post) => {
        return { ...post, user };
      });
      dataToUser = { posts };
      if (pageNo == 1) {
        const count = await Post.countDocuments();
        dataToUser["count"] = count;
      }
    } else {
      const dataArray = await User.findOne({ _id: query.userId }).populate({
        path: "likedPosts",
        model: "Post",
        options: {
          skip: skip,
          limit: itemsPerPage,
          lean: true,
          select: "_id title user data updatedAt likedBy comments",
          populate: {
            path: "user",
            model: "User",
            select: "_id name image",
            options: { lean: true },
          },
          sort: { updatedAt: -1 },
        },
      });
      dataToUser = { posts: dataArray.likedPosts };
      if (pageNo == 1) {
        const count = await Post.countDocuments();
        dataToUser["count"] = count;
      }
    }
    return new Response(JSON.stringify(dataToUser), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
