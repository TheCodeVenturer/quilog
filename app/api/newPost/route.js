import db from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User";
import mongoose from "mongoose";

export async function POST(req) {
	const session = mongoose.startSession();
	try {
		const { userId, title, content } = await req.json();
		await db.connect();
		session.startTransaction();
		const user = await User.findOne({ _id: userId });

		if (!user) {
			throw new Error("You are not authorized to create a post");
		}

		const newPost = await Post.create(
			{ user: userId, title, data: content },
			{ session }
		);
		const postId = newPost._doc._id;
		user.posts.push(postId);
		user.save({ session });
		await session.commitTransaction();

		return new Response(JSON.stringify(postId), { status: 201 });
	} catch (error) {
		// console.log(error.message);
		return new Response(JSON.stringify(error.message), { status: 500 });
	}
}
