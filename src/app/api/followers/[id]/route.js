import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const users = await User.find({ following: { $in: [id] } });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "failed to fetch details" },
      { status: 500 }
    );
  }
}
