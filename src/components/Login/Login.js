"use client";
import Link from "next/link";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function setVisibility() {
    setVisible(!visible);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        setIsLoading(false);
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <div className="bg-white rounded-xl flex flex-col shadow-xl p-8 sm:w-[450px] w-[100%]">
        <h2 className="text-2xl font-bold my-3">Sign in</h2>
        <p className="text-gray-400">to continue to PicPortal</p>
        <div>
          <form className="flex flex-col relative" onSubmit={handleSubmit}>
            <label className="mt-5 mb-2 font-bold">Email Address</label>
            <input
              type="text"
              placeholder="Enter your Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-lg h-[40px] outline-none focus:border-blue-600 border border-gray-300 p-3"
            />
            <label className="mt-5 mb-2 font-bold">Password</label>
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="relative rounded-lg outline-none h-[40px] focus:border-blue-600 border border-gray-300 p-3"
            />
            {visible ? (
              <FaRegEyeSlash
                className="absolute right-2 top-[150px] cursor-pointer text-gray-500"
                size={25}
                onClick={setVisibility}
              />
            ) : (
              <FaEye
                onClick={setVisibility}
                className="absolute right-2 top-[150px] cursor-pointer text-gray-500"
                size={25}
              />
            )}
            {error && <p className="text-red-500">{error}</p>}
            <button
              className="bg-blue-600 py-2 my-5 text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
          </form>
        </div>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
