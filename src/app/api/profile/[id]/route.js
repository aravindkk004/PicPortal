import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const profile = await User.findOne({ _id: id });
    if (!profile) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }
    return NextResponse.json({profile }, { status: 200 });
  } catch (err) {
    console.error("Error fetching user profile:", err); // Log any errors
    return NextResponse.json({ message: "Error in fetching" }, { status: 500 });
  }
}

