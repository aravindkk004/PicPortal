import { connectMongoDB } from "@lib/mongodb";
import { NextResponse } from "next/server";
import User from "@models/user";

export async function POST(request) {
  const { postId, userId } = await request.json();
  await connectMongoDB();

  const user = await User.findOne({ "posts._id": postId });

  const postIndex = user.posts.findIndex(
    (post) => post._id.toString() === postId
  );
  if (postIndex === -1) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
  if (user.posts[postIndex].likes.includes(userId)) {
    return NextResponse.json({ message: "You have already liked this post" }, { status: 200 });
  }
  user.posts[postIndex].likes.push(userId);
  await user.save();
  return NextResponse.json(
    { message: "Like updated successfully" },
    { status: 200 }
  );
}
