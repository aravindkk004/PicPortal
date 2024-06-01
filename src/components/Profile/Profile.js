"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IoPersonCircleSharp } from "react-icons/io5";
import MyPost from "@components/MyPost/MyPost";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const { data: session, status } = useSession();
  const [error, setError] = useState("No error");
  const [fileName, setFileName] = useState("No file chosen");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/profile/${session.user.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const { profile } = await res.json();
        setProfile(profile);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (session) {
      fetchData();
    }
  }, [session]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const confirmed = confirm(
        "Are you sure you want to delete your account? "
      );
      if (confirmed) {
        const response = await axios.delete(
          `/api/peoples/delete?id=${session?.user?.id}`
        );
        if (response.status === 200) {
          signOut();
          router.replace("/login");
        }
      }
    } catch (err) {
      setError("An error occurred while deleting your account.");
    }
  };

  const handleFileChange = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    reader.onload = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  useEffect(() => {
    if (imagePreviewUrl) {
      uploading();
    }
  }, [imagePreviewUrl]);

  const uploading = async () => {
    try {
      const res = await axios.post(`/api/profile/profileUpload`, {
        userId: session?.user?.id,
        imgUrl: imagePreviewUrl,
      });
      if (res.status === 200) {
        window.location.reload();
      } else {
        setError("Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to upload image");
    }
  };

  const sortPostsByDate = (posts) => {
    return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const  onDeletePost= (postId) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      posts: prevProfile.posts.filter((post) => post._id !== postId),
    }));
  };

  return (
    <div className="flex flex-col items-center mt-[40px] w-full ">
      {loading ? (
        <div>Loading...</div>
      ) : profile ? (
        <div className="relative sm:w-[75%] w-[85%] border border-black rounded-lg flex flex-col items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="h-[130px] w-[130px] my-[20px] flex items-center justify-center relative">
              {profile.profileImg ? (
                <img
                  src={profile.profileImg}
                  alt="Profile"
                  className="h-[130px] w-[130px] object-cover rounded-full"
                />
              ) : (
                <IoPersonCircleSharp size={130} className="text-gray-400" />
              )}
              <FaCamera
                className="absolute p-2 bottom-0 right-4 bg-white rounded-full cursor-pointer border-black border"
                size={35}
                onClick={() => document.getElementById("fileInput").click()}
              />
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <h2 className="font-bold text-2xl">{profile.username}</h2>
          </div>
          <div className="flex items-center justify-between sm:w-[50%] w-[85%] my-[30px] cursor-pointer">
            <div
              className="flex flex-col items-center w-[130px]"
              onClick={() => router.push(`/followers/${session?.user?.id}`)}
            >
              <h3>{profile.followedby.length}</h3>
              <p>Followers</p>
            </div>
            <div
              className="flex flex-col items-center w-[130px] cursor-pointer"
              onClick={() => router.push(`/following/${session?.user?.id}`)}
            >
              <h3>{profile.following.length}</h3>
              <p>Following</p>
            </div>
            <div className="flex flex-col items-center w-[130px]">
              <h3>{profile.posts?.length}</h3>
              <p>{profile.posts?.length <= 1 ? "Post" : "Posts"}</p>
            </div>
          </div>
          <div className="sm:w-[80%] w-[100%] mb-[20px] rounded-lg top-[50px] right-4 flex justify-center">
            <button
              className="bg-red-600 w-[80%] text-white px-5 py-2 rounded-lg cursor-pointer"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <div>No profile found</div>
      )}
      <div className="my-10 w-full">
        <h2 className="text-center font-extrabold sm:text-3xl text-xl mb-2">
          Your Posts
        </h2>
        <div className="flex flex-col items-center w-full">
          {profile && profile.posts && profile.posts.length > 0 ? (
            sortPostsByDate(profile.posts).map((p) => (
              <MyPost
                key={p._id}
                imgUrl={p.imgUrl}
                username={profile.username}
                description={p.description}
                postId={p._id}
                userId={profile._id}
                onDeletePost={onDeletePost} 
              />
            ))
          ) : (
            <p className="text-center text-xl font-bold bg-gray-200 flex items-center justify-center w-[80%] h-[200px] rounded-xl mt-10">
              No posts available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}



