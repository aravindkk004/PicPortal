"use client";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";
import axios from "axios";

const UserPost = ({ username, description, like, imgUrl, postId, likees }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(like);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    if (session?.user?.id && likees) { 
      setLiked(likees.includes(session.user.id) || false);
    }
  }, [session, likees]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.get(`/api/user/${session?.user?.id}`);
        const user = response.data.user;
        if (user.saved) {
          const isSaved = user.saved.includes(postId);
          setSave(isSaved);
        } else {
          setSave(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(error);
      }
    };
  
    fetching();
  }, []);

  const handleLike = async () => {
    if (liked) return;

    try {
      setLikes((prevLikes) => prevLikes + 1);
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
      setLikes((prevLikes) => prevLikes - 1);
      setLiked(false);
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
        throw new Error("Failed to save post");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save post: " + err.message);
      setSave(false);
    }
  };

  return (
    <>
      <div className="w-[100%] flex justify-center my-[40px] relative">
        <div className="sm:w-[75%] w-[100%] p-5 rounded-lg border border-gray-500 mb-5 relative">
          {/* {key === session?.user?.id && (
            <BsThreeDots className="absolute right-6 top-7 cursor-pointer" />
          )} */}
          {error && <p className="text-red-500">{error.message}</p>}
          <div className="flex items-center mb-3">
            <div className="h-[40px] w-[40px] rounded-full mr-2 flex items-center justify-center">
              <IoPersonCircleSharp size={40} className="text-gray-400" />
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
                <FaHeart size={20} className="text-red-500" />
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
                <FaBookmark size={20} className="cursor-pointer" />
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
};

export default UserPost;
