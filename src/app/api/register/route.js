import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { username, email, password, fullname } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({username, email, password: hashedPassword})
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error while registering user" },
      { status: 500 }
    );
  }
}
