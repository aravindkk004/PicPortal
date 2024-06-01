import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function GET() {
  try {
    await connectMongoDB();
    const post = await User.find();
    return NextResponse.json({ post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Fetching error" }, { status: 500 });
  }
}
