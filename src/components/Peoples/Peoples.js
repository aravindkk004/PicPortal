"use client";
import axios from "axios";
import People from "./People";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Peoples = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("api/peoples", {
          cache: "no-store",
        });
        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }
        if (Array.isArray(res.data)) {
          setDatas(res.data);
        } else {
          throw new Error("Data format is incorrect, expected an array");
        }
      } catch (err) {
        console.error("Fetching error:", err);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-2xl font-extrabold">Loading...</div>
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center">Peoples</h2>
      <div className="w-[85%]">
        {datas
          .filter((d) => d._id.toString() !== session?.user?.id)
          .map((d) => (
            <People key={d._id} data={d} />
          ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Peoples;
