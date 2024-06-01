"use client";
import LeftNav from "@/components/LeftNav/LeftNav";
import RightNav from "@/components/RightNav/RightNav";
import SavedPost from "@components/SavedPost/SavedPost";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const {data: session} = useSession()
  const [savedPosts, setSavedPosts] = useState({ ids: [], list: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      try {
        console.log(session?.user?.id)
        const res = await axios.get(`/api/savedpost/${session?.user?.id}`);
        if (!res.data.savedPostIds || !res.data.savedPostList) {
          throw new Error('Failed to fetch data'); 
        }
        setSavedPosts({ 
          ids: res.data.savedPostIds,
          list: res.data.savedPostList
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error fetching saved posts.");
        setLoading(false); 
      }
    };
    fetching();
  }, []);

  return (
    <>
      <div className="flex h-[100vh] fixed top-0 left-0 w-full">
        <div className="md:w-[20%] border-r border-r-gray-400 sm:block sm:w-[30%]">
          <LeftNav activeLink={"savedPost"} />
        </div>
        <div className="md:w-[55%] sm:w-[70%] w-full overflow-y-scroll flex-col flex items-center sm:mt-3 mt-[70px] sm:mb-3 mb-[80px]">
        {loading ? (
          <div className="text-center text-2xl font-extrabold">Loading...</div>
          ) : (
            <SavedPost post={savedPosts} />
          )}
        </div>
        <div className="md:w-[25%] border-l border-l-gray-400 hidden md:block">
          <RightNav />
        </div>
      </div>
    </>
  );
}
