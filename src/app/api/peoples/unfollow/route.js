import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function POST(req) {
  const { followId, userId } = await req.json();
  try {
    await connectMongoDB();
    await User.updateOne({ _id: userId }, { $pull: { following: followId } });
    await User.updateOne({ _id: followId }, { $pull: { followedy: userId } });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "fetching error" }, { status: 500 });
  }
}
