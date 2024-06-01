import Link from "next/link";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const Suggesstions = ({data}) => {
  const [follow, setFollow] = useState(false);
  const {data: session} = useSession()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/user/${session?.user?.id}`);
        const user = response.data.user; 
        setFollow(user.following?.map(id => id.toString()).includes(data._id.toString()) || false);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between mt-[20px]">
        <div className="flex items-center mb-[10px]">
          <div className="mr-[10px]">
            <div className="h-[50px] w-[50px]  rounded-full">{data.profileImg ? (
                <img
                  src={data.profileImg}
                  alt="Profile"
                  className="h-[50px] w-[50px] object-cover rounded-full"
                />
              ) : (
                <IoPersonCircleSharp size={50} className="text-gray-400" />
              )}</div>
          </div>
          <div>
            <h2 className="lg:font-bold text-md">{data.username}</h2>
          </div>
        </div>
        <div>
          <Link href="" className="text-blue-400">
            Follow
          </Link>
        </div>
      </div>
    </>
  );
};

export default Suggesstions;
