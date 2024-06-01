import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function POST(req) {
    const { imgUrl,  userId } = await req.json();
    console.log("this is image url", imgUrl);
    try {
      await connectMongoDB();
      const updatedprofile = await User.findByIdAndUpdate(userId, { profileImg: imgUrl });
      console.log("updated profile", updatedprofile);
      return NextResponse.json({ msg: "success" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ msg: "failed" }, { status: 500 });
    }
  }