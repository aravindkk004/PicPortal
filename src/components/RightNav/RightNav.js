"use client";
import axios from "axios";
import Suggesstions from "./Suggesstions/Suggesstions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";

const RightNav = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  const [suggesstions, setSuggesstions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/user/${session?.user?.id}`);
        const userData = res.data.user;
        setUserData(userData);

        const datas = await axios.get(`/api/peoples`);
        setSuggesstions(datas.data);
      } catch (error) {
        console.error("Fetching error:", error);
        setError("Fetching error");
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <nav className="mt-[40px] px-[20px]">
      <div className="flex items-center mb-[10px]">
        <div className="mr-[10px]">
          <div className="h-[50px] w-[50px] rounded-full">
            {userData?.profileImg ? (
              <img
                src={userData.profileImg}
                alt="Profile"
                className="h-[50px] w-[50px] object-cover rounded-full"
              />
            ) : (
              <IoPersonCircleSharp size={50} className="text-gray-400" />
            )}
          </div>
        </div>
        <div>
          <h2 className="font-bold">{userData?.username}</h2>
        </div>
      </div>
      <div>
        <p className="text-gray-400">
          &copy;{new Date().getFullYear()} PicPortal
        </p>
      </div>
      <div className="mt-[20px]">
        <h3 className="font-semibold">Suggesstions for you</h3>
        <div>
          {suggesstions
            .filter(
              (data) =>
                !data.followedby.includes(session?.user?.id) &&
                data._id !== session?.user?.id
            )
            .slice(0, 5)
            .map((data) => (
              <Suggesstions key={data._id} data={data} />
            ))}
        </div>
      </div>
    </nav>
  );
};

export default RightNav;
