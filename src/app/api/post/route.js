import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req, res) {
  try {
    await connectMongoDB();
    const posts = await User.find({});
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
