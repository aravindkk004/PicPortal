import { IoPersonCircleSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";
import UserPost from "@components/UserPost/UserPost";
import { useRouter } from "next/navigation";

const UserProfile = ({ profile }) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="relative w-[75%] border border-black rounded-lg flex flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="h-[130px] w-[130px] my-[20px] flex items-center justify-center">
            <IoPersonCircleSharp size={120} className="text-gray-400" />
          </div>
          <h2 className="font-bold text-2xl">{profile.username}</h2>
        </div>
        <div className="flex items-center justify-between w-[50%] my-[30px]">
          <div
            className="flex flex-col items-center w-[130px] cursor-pointer"
            onClick={() => router.push(`/following/${profile._id}`)}
          >
            <h3>{profile.following?.length}</h3>
            <p>Following</p>
          </div>
          <div
            className="flex flex-col items-center w-[130px] cursor-pointer"
            onClick={() => router.push(`/followers/${profile._id}`)}
          >
            <h3>{profile.followedby?.length}</h3>
            <p>Followers</p>
          </div>
          <div className="flex flex-col items-center w-[130px]">
            <h3>{profile.posts?.length}</h3>
            <p>{profile.posts?.length <= 1 ? "Post" : "Posts"}</p>
          </div>
        </div>
      </div>

      <div className="my-10">
        <h2 className="text-center font-bold text-2xl mb-2">
          {session?.user?.id === profile._id
            ? "Your Posts"
            : `${profile.username}'s Posts`}
        </h2>
        <div className="flex flex-col items-center">
          {profile && profile.posts && profile.posts.length > 0 ? (
            profile.posts.map((p) => (
              <UserPost
                key={p._id}
                imgUrl={p.imgUrl}
                username={profile.username}
                description={p.description}
                postId={p._id}
                like={p.likes.length}
                likees={p.likes}
              />
            ))
          ) : (
            <p className="text-center text-xl font-bold bg-gray-200 flex items-center justify-center w-full h-[200px] rounded-xl mt-10">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
