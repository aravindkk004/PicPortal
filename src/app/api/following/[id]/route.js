import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const followedUsers = await User.find({ followedby: { $in: [id] } });
    return NextResponse.json({ users: followedUsers }, { status: 200 });
  } catch (error) {
    console.log("failed");
    return NextResponse.json(
      { message: "failed to fetch details" },
      { status: 500 }
    );
  }
}
