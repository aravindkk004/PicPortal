"use client";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const People = ({ data }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/user/${session?.user?.id}`);
        const user = response.data.user;
        setFollow(
          user.following
            ?.map((id) => id.toString())
            .includes(data._id.toString()) || false
        );
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, []);

  const handleFollow = async (e) => {
    e.preventDefault();
    setFollow(true);
    try {
      const response = await axios.post("api/peoples/follow", {
        followId: data._id,
        userId: session.user.id,
      });
      if (response.status !== 200) {
        setError(res.error);
        setFollow(false);
      }
    } catch (err) {
      setError(err);
      setFollow(false);
    }
  };

  const handleUnFollow = async (e) => {
    e.preventDefault();
    setFollow(false);
    try {
      const res = await axios.post("/api/peoples/unfollow", {
        followId: data._id,
        userId: session.user.id,
      });
      if (response.status !== 200) {
        setError(res.error);
        setFollow(true);
      }
    } catch (error) {
      setError(error);
      setFollow(true);
    }
  };

  const userprofile = () => {
    router.push(`/userProfile/${data._id}`);
  };
  return (
    <>
      <div className="flex items-center justify-between w-full px-3 py-2 my-3 cursor-pointer">
        <div className="flex items-center" onClick={userprofile}>
          <div>
            {data.profileImg ? (
              <img
                src={data.profileImg}
                alt="Profile"
                className="h-[50px] w-[50px] object-cover rounded-full"
              />
            ) : (
              <IoPersonCircleSharp size={50} className="text-gray-400" />
            )}
          </div>
          <div className="ml-2">
            <h3 className="font-bold text-lg">{data.username}</h3>
          </div>
        </div>
        <div>
          {follow ? (
            <button
              className="border border-blue-600 rounded-lg text-lg  px-3 flex items-center py-2"
              onClick={handleUnFollow}
            >
              Following
              <TiTick size={20} className=" ml-2" />
            </button>
          ) : (
            <button
              className="bg-blue-600 rounded-lg text-lg text-white px-3 flex items-center py-2"
              onClick={handleFollow}
            >
              Follow <IoPersonAddSharp size={20} className="text-white ml-2" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default People;
