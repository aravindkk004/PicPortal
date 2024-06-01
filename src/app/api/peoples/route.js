import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await connectMongoDB();
    const data = await User.find().lean();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Api error" }, { status: 500 });
  }
}
