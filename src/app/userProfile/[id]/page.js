"use client";
import LeftNav from "@components/LeftNav/LeftNav";
import RightNav from "@components/RightNav/RightNav";
import UserProfile from "@components/UserProfile/UserProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const params = useParams();
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await axios.get(`/api/profile/${params.id.toString()}`);
        if (res.status !== 200) {
          setError("Failed to fetch user profile");
        }
        setProfile(res.data.profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile");
      }
    };
  
    fetching();
  }, []);
  return (
    <>
      <div className="flex h-[100vh] fixed top-0 left-0 w-full">
        <div className="md:w-[20%] border-r border-r-gray-400 sm:block sm:w-[30%]">
          <LeftNav activeLink={"Profile"} />
        </div>
        <div className="md:w-[55%] sm:w-[70%] w-full overflow-y-scroll  mb-[80px] sm:mb-3 mt-[50px] sm:mt-3">
        {profile && (
          <UserProfile profile={profile} />)}
        </div>
        <div className="md:w-[25%] border-l border-l-gray-400 hidden md:block">
          <RightNav />
        </div>
      </div>
    </>
  );
}
