import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const user = await User.findOne({ _id: id }); 
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ message: "Failed to fetch user profile" }, { status: 500 });
  }
}
