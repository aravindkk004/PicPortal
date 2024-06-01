import { connectMongoDB } from "@lib/mongodb";
import { NextResponse } from "next/server";
import User from "@models/user";

export async function POST(request) {
  const { postId, userId } = await request.json();
  await connectMongoDB();
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }
  user.saved.push(postId);
  await user.save();

  const post = await User.findOne({ "posts._id": postId });
  if (!post.savedby.includes(userId)) {
    post.savedby.push(userId);
    await post.save();
  }

  return NextResponse.json({ message: "success" }, { status: 200 });
}
