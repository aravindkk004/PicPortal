"use client";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoIosSave } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LeftNav = ({ activeLink }) => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };
  return (
    <>
      <nav className="sm:relative sm:h-[100vh] fixed bottom-0 w-full z-50 bg-white">
        <h2 className="sm:flex sm:items-center sm:justify-between sm:bg-transparent fixed top-0 left-0 w-full text-center bg-white">
          <img src="logo.png" alt="logo" className="sm:h-[80px] h-[60px]" />
        </h2>
        <div className="sm:w-full sm:px-[20px] sm:mt-[80px] sm:border-none w-full border-t border-black bg-white">
          <ul className="flex sm:flex-col bg-white  w-[100%] justify-between z-5">
            <li
              className={`list-none my-[8px] p-[10px] ${
                activeLink === "Home" ? "bg-blue-600 text-white" : ""
              } rounded-3xl`}
            >
              <Link href="/" className="flex items-center lg:text-xl text-md">
                <IoHome className="sm:mr-[10px]" size={20}/>
                <p className="hidden sm:block">Home</p>
              </Link>
            </li>
            <li
              className={`list-none my-[8px] p-[10px] ${
                activeLink === "CreatePost" ? "bg-blue-600 text-white" : ""
              } rounded-3xl`}
            >
              <Link
                href="/createPost"
                className="flex items-center lg:text-xl text-md"
              >
                <BiSolidImageAdd className="sm:mr-[10px]"  size={20}/>
                <p className="hidden sm:block">Create Post</p>
              </Link>
            </li>
            <li
              className={`list-none my-[8px] p-[10px] ${
                activeLink === "savedPost" ? "bg-blue-600 text-white" : ""
              } rounded-3xl`}
            >
              <Link
                href="/savedPost"
                className="flex items-center lg:text-xl text-md"
              >
                <IoIosSave className="sm:mr-[10px]"  size={20}/>
                <p className="hidden sm:block">Saved Post</p>
              </Link>
            </li>
            <li
              className={`list-none my-[8px] p-[10px] ${
                activeLink === "Peoples" ? "bg-blue-600 text-white" : ""
              } rounded-3xl`}
            >
              <Link
                href="/peoples"
                className="flex items-center lg:text-xl text-md"
              >
                <IoPeople className="sm:mr-[10px]"  size={20}/>
                <p className="hidden sm:block">Peoples</p>
              </Link>
            </li>
            <li
              className={`list-none my-[8px] p-[10px] ${
                activeLink === "Profile" ? "bg-blue-600 text-white" : ""
              } rounded-3xl`}
            >
              <Link
                href="/profile"
                className="flex items-center lg:text-xl text-md"
              >
                <FaUser className="sm:mr-[10px]"  size={20}/>
                <p className="hidden sm:block">Profile</p>
              </Link>
            </li>
            <li
              className={`sm:absolute sm:bottom-[15%] sm:w-full sm:px-[20px] list-none my-[10px] p-[10px] ${
                activeLink === "Logout" ? "bg-blue-600 text-white" : ""
              } rounded-3xl`}
              onClick={handleSignOut}
            >
              <Link href="" className="flex items-center lg:text-xl text-md">
                <MdLogout className="sm:mr-[10px]"  size={20}/>
                <p className="hidden sm:block">Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default LeftNav;
