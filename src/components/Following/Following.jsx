import Follow from "./Follow";

const Following = ({ data }) => {
  return (
    <div className="sm:mt-8 flex flex-col items-center mt-[60px]">
      <h2 className="text-2xl font-bold text-center ">Peoples</h2>
      <div className="sm:w-[85%] w-[97%]">
        {data.length === 0 ? (
          <p className="text-center text-xl font-bold bg-gray-200 flex items-center justify-center w-full h-[200px] rounded-xl mt-10">
            No following
          </p>
        ) : (
          data.map((d) => <Follow key={d._id} data={d} />)
        )}
      </div>
    </div>
  );
};

export default Following;
