"use client";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { useSession } from "next-auth/react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function MyPost({
  imgUrl,
  description,
  username,
  postId,
  userId,
  onDeletePost,
}) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);
  const [save, setSave] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`api/user/${session?.user?.id}`);
        const user = userResponse.data.user;
        setUser(user);
        const isSaved = user.saved ? user.saved.includes(postId) : false;
        setSave(isSaved);

        let postLikes = 0;
        let userLiked = false;

        user.posts.forEach((post) => {
          if (post._id === postId) {
            userLiked = post.likes
              ? post.likes.includes(session?.user?.id)
              : false;
            postLikes = post.likes ? post.likes.length : 0;
          }
        });

        setLikes(postLikes);
        setLiked(userLiked);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Error fetching user details");
      }
    };
    fetchData();
  }, []);

  const handleLike = async () => {
    if (liked) return;

    try {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setLiked(true);

      const res = await axios.post("api/post/like", {
        postId: postId,
        userId: session?.user?.id,
      });
      if (res.status !== 200) {
        throw new Error("Failed to update likes");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update likes: " + err.message);
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleUnlike = async () => {
    if (!liked) return;

    try {
      const newLikes = likes - 1;
      setLikes(newLikes);
      setLiked(false);

      const res = await axios.post("api/post/unlike", {
        postId: p._id,
        userId: session?.user?.id,
      });
      if (res.status !== 200) {
        setError("Failed to update likes");
      }
    } catch (error) {
      setError(error);
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleSave = async () => {
    try {
      setSave(true);
      const response = await axios.post("api/post/save", {
        postId: postId,
        userId: session?.user?.id,
      });

      if (response.status !== 200) {
        setError("Failed to save post");
        throw new Error("Failed to save post");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save post: " + err.message);
      setSave(false);
    }
  };

  const handleUnsave = async () => {
    try {
      setSave(false);
      const response = await axios.post("api/post/unsave", {
        postId: p._id,
        userId: session?.user?.id,
      });

      if (response.status !== 200) {
        setError(response.error);
        throw new Error("failed to save post");
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setSave(true);
    }
  };

  const handleDeletePost = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        const response = await axios.delete(`/api/post/delete?id=${postId}`);
        if (response.status === 200) {
          onDeletePost(postId);  
        }
      } catch (error) {
        console.error(error);
        setError("Failed to delete post");
      }
    }
  };

  return (
    <>
      <div className="w-[100%] flex justify-center my-[40px] relative">
        <div className="sm:w-[75%] w-[100%] p-5 rounded-lg border border-gray-500 mb-5 relative">
          {userId === session?.user?.id && (
            <MdDelete
              size={30}
              className="absolute right-6 top-7 cursor-pointer text-white bg-red-600 p-1 rounded-md"
              onClick={handleDeletePost}
            />
          )}
          <div className="flex items-center mb-3">
            <div className="h-[40px] w-[40px] rounded-full mr-2 flex items-center justify-center">
              {user.profileImg ? (
                <img
                  src={user.profileImg}
                  alt="Profile"
                  className="h-[40px] w-[40px] object-cover rounded-full"
                />
              ) : (
                <IoPersonCircleSharp size={40} className="text-gray-400" />
              )}
            </div>
            <h2 className="font-bold text-lg">{username}</h2>
          </div>
          <div className="w-full flex justify-center rounded-lg">
            <img
              src={imgUrl}
              alt=""
              className="w-full rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="my-3 flex items-center justify-between">
            <div className="flex items-center">
              {liked ? (
                <FaHeart
                  size={20}
                  className="text-red-500 cursor-pointer"
                  onClick={handleUnlike}
                />
              ) : (
                <FaRegHeart
                  size={20}
                  className="cursor-pointer"
                  onClick={handleLike}
                />
              )}
              <p className="ml-2">{likes}</p>
            </div>
            <div>
              {save ? (
                <FaBookmark
                  size={20}
                  className="cursor-pointer"
                  onClick={handleUnsave}
                />
              ) : (
                <FaRegBookmark
                  size={20}
                  className="cursor-pointer"
                  onClick={handleSave}
                />
              )}
            </div>
          </div>
          <div>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}