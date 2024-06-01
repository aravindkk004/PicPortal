import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function GET(req, {params}){
    const {id} = await params;
    try{
        await connectMongoDB();
        const user = await User.findById(id);
        return NextResponse.json({user}, {status: 200});
    }
    catch(err){
        return NextResponse.json({err}, {status: 500});
    }
}