import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { imgUrl, description, email } = await req.json();
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 500 });
    }
    if (!user.posts) {
      user.posts = [];
    }
    const newPost = {
      imgUrl: imgUrl,
      description: description,
    };
    const check = user.posts.push(newPost);
    await user.save();
    return NextResponse.json(
      { message: "Post added successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error while post" }, { status: 500 });
  }
}