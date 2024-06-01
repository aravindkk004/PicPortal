import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function POST(req) {
    const { postId, userId } = await req.json();
    try{
        await connectMongoDB()
        await User.updateOne({ _id: userId }, { $pull: { saved: postId } });
        await User.updateOne({ _id: postId }, { $pull: { savedby: userId } });
        return NextResponse.json({message: "success"}, {status: 200});
    }catch(err){
        return NextResponse.json({message: "failed to fetch"}, {status: 500});
    }

}