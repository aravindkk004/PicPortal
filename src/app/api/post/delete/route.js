import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function DELETE(request, {params}){
    const id = request.nextUrl.searchParams.get("id");
    try {
        await connectMongoDB();
        const user = await User.findOneAndUpdate(
            { "posts._id": id },
            { $pull: { posts: { _id: id } } },
            { new: true } 
        );
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
    }
}