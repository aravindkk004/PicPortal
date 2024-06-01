"use client";
import Following from "@components/Following/Following";
import LeftNav from "@components/LeftNav/LeftNav";
import RightNav from "@components/RightNav/RightNav";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/following/${params.id.toString()}`);
        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }
        console.log(res.data.users);
        setData(res.data.users);
      } catch (error) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, [session]);
  return (
    <>
      <div className="flex h-[100vh] fixed top-0 left-0 w-full">
        <div className="md:w-[20%] border-r border-r-gray-400 sm:block sm:w-[30%]">
          <LeftNav activeLink={"Profile"} />
        </div>
        <div className="md:w-[55%] sm:w-[70%] w-full overflow-y-scroll  mb-[80px] sm:mb-3 mt-[50px] sm:mt-3">
          <Following data={data} />
        </div>
        <div className="md:w-[25%] border-l border-l-gray-400 hidden md:block">
          <RightNav />
        </div>
      </div>
    </>
  );
}
