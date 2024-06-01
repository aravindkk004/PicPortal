import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function POST(req) {
  const { followId, userId } = await req.json();
  try {
    await connectMongoDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    user.following.push(followId);
    await user.save();
    const follower = await User.findById(followId);
    if (!follower) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    follower.followedby.push(userId);
    await follower.save();
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
