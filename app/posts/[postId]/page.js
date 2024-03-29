import BlogbyId from "@/app/_components/Blog";
import db from "@/lib/db";
import Post from "@/models/Post";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: { postId } }) {
  var title = "";
  var description = "";
  try {
    db.connect();
    const post = await Post.findOne({ _id: postId })
      .select("title user likedBy comments")
      .populate({
        path: "user",
        select: "name image",
        options: { lean: true },
      })
      .lean();

    title = post.title;
    if (title.length > 10) {
      title = `${title.slice(0, 10)}...`;
    }
    title = `${title} | Posts`;
    description = `A postby by ${post.user.name} \n ${post.likedBy.length} likes \t ${post.comments.length} comments`;
  } catch (error) {
    redirect("/posts");
  }
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://quilog.vercel.app/posts/${postId}`,
    },
  };
}

export default async function Page({ params: { postId } }) {
  return (
    <>
      <BlogbyId postId={postId} />
    </>
  );
}
// const Share = "https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/#:~:text=bit%20of%20preparation.-,Get%20the%20Session%20in%20a%20Server%20Component,file%20during%20the%20NextAuth%20setup."
