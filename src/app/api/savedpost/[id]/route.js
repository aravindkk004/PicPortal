import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function GET(req, { params }) {
  try {
    // Extract id from params
    const { id } = params;

    // Connect to MongoDB
    await connectMongoDB();

    // Find user by id
    const user = await User.findById(id);
    
    // If user not found, return 404
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Initialize arrays to store saved post ids and post objects
    const savedPostIds = await user.saved;
    const savedPostList = [];
    console.log("saved post ids", savedPostIds)
    // Iterate over savedPostIds and fetch corresponding posts
    for (let i = 0; i < savedPostIds.length; i++) {
      const postId = savedPostIds[i];
      
      // Find post by postId
      const post = await User.findOne({ "posts._id": postId });
      console.log("this is each post", post);
      
      // If post exists and is not already in savedPostList, add it
      if (post && !savedPostList.some(savedPost => savedPost._id === postId)) {
        savedPostList.push(post);
      }
    }
    console.log("this is saved post", savedPostList)
    // Prepare response
    const response = {
      savedPostIds: savedPostIds,
      savedPostList: savedPostList,
    };

    // Return response with status 200
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // If any error occurs, log it and return 500 status with error message
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching saved post IDs" },
      { status: 500 }
    );
  }
}
