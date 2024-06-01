"use client";
import LeftNav from "@/components/LeftNav/LeftNav";
import RightNav from "@/components/RightNav/RightNav";
import Post from "@/components/Post/Post";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const { posts } = await res.json();
        setPost(posts);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="flex h-[100vh] fixed top-0 left-0 w-full">
        <div className="md:w-[20%] border-r border-r-gray-400 sm:w-[30%]">
          <LeftNav activeLink={"Home"} />
        </div>
        <div className="md:w-[55%] sm:w-[70%] w-full overflow-y-scroll sm:mt-3 mt-10 mb-[80px] sm:mb-3">
          {loading ? (
            <div className="text-center mt-10 text-2xl font-extrabold">
              Loading...
            </div>
          ) : error ? (
            <div className="text-center mt-10 text-2xl text-red-500 font-extrabold">
              {error}
            </div>
          ) : (
            <Post post={post} />
          )}
        </div>
        <div className="md:w-[25%] border-l border-l-gray-400 hidden md:block">
          <RightNav />
        </div>
      </div>
    </>
  );
}
