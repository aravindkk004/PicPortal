"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";

const PostItem = ({ post, p }) => {
  const { data: session } = useSession();

  const [likes, setLikes] = useState(p.likes?.length);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setLiked(p.likes?.includes(session.user.id) || false);
    }
  }, [session, p.likes]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.get(`api/user/${session?.user?.id}`);
        const user = response.data.user;
        if (user.saved) {
          const isSaved = user.saved.includes(p._id);
          setSave(isSaved);
        } else {
          setSave(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetching();
  }, []);

  const handleLike = async () => {
    if (liked) return;

    try {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setLiked(true);

      const res = await axios.post("api/post/like", {
        postId: p._id,
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

  return (
    <div className="w-[100%] flex justify-center my-[40px]">
      <div className="sm:w-[75%] w-[100%] p-5 rounded-lg border-2 border-black mb-10">
        <div className="flex items-center mb-3">
          <div className="h-[40px] w-[40px] rounded-full mr-2 flex items-center justify-center">
            {post.profileImg ? (
              <img
                src={post.profileImg}
                alt="Profile"
                className="sm:h-[40px] sm:w-[40px] h-[25px] w-[25px] object-cover rounded-full"
              />
            ) : (
              <IoPersonCircleSharp size={40} className="text-gray-400" />
            )}
          </div>
          <h2 className="font-bold sm:text-lg text-base">{post.username}</h2>
        </div>
        <div className="w-full flex justify-center rounded-lg">
          <img
            src={p.imgUrl}
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
        <p>{p.description}</p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default PostItem;
