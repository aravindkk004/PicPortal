import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function POST(req) {
  const { postId, userId } = await req.json();
  try {
    await connectMongoDB();
    await User.updateOne(
      { "posts._id": postId },
      { $pull: { "posts.$.likes": userId } }
    );
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failed to update" }, { status: 500 });
  }
}
