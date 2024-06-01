import Profile from "@components/Profile/Profile";
import LeftNav from "@components/LeftNav/LeftNav";
import RightNav from "@components/RightNav/RightNav";

const Home = () => {
  return (
    <>
      <div className="flex h-[100vh] fixed top-0 left-0 w-full">
        <div className="md:w-[20%] border-r border-r-gray-400 sm:block sm:w-[30%]">
          <LeftNav activeLink = {"Profile"}/>
        </div>
        <div className="md:w-[55%] sm:w-[70%] w-full overflow-y-scroll sm:mt-3 mt-[50px] mb-[80px] sm:mb-3">
          <Profile />
        </div>
        <div className="md:w-[25%] border-l border-l-gray-400 hidden md:block">
          <RightNav />
        </div>
      </div>
    </>
  );
};

export default Home;