import db from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function GET(req, { params: { postId } }) {
  try {
    await db.connect();
    const post = await Post.findOne({ _id: postId })
      .populate({
        path: "user",
        select: "_id name image",
        options: { lean: true },
      })
      .populate({
        path: "likedBy",
        select: "_id name image",
        options: { lean: true },
      })
      .populate({
        path: "comments",
        model: Comment,
        populate: {
          path: "user",
          model: "User",
          select: "_id name image createdAt",
          options: {
            lean: true,
          },
        },
        options: { lean: true, sort: { updatedAt: -1 } },
      });
    if (!post) {
      throw new Error("Post not found");
    }
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function POST(req, { params: { postId } }) {
  try {
    const session = await getServerSession(authOptions);
    const data = await req.json();

    await db.connect();
    const post = await Post.findOne({ _id: postId });

    if (!post) {
      throw new Error("Post not found");
    }
    const newComment = await Comment.create({
      text: data.comment,
      user: session.user.id,
    });
    const commentId = newComment._doc._id;
    post.comments.push(commentId);
    post.save();
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PATCH(req, { params: { postId } }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    await db.connect();

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (post.likedBy.includes(userId)) {
      post.likedBy = post.likedBy.filter((id) => id !== userId);
      user.likedPosts = user.likedPosts.filter((id) => id !== postId);
    } else {
      post.likedBy.push(userId);
      user.likedPosts.push(postId);
    }

    await user.save();
    await post.save();

    // You can add console.log or return statements here if needed

    return new Response(JSON.stringify({ success: "ok" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
