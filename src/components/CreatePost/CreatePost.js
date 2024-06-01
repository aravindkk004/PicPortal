"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreatePost(){
  const { data: session } = useSession();

  const [fileName, setFileName] = useState("No file chosen");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    reader.onload = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch("api/post/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imgUrl: imagePreviewUrl,
          description: description,
          email: session?.user?.email,
        }),
      });

      if (res.ok) {
        setDescription("");
        setFileName("No file chosen");
        setImagePreviewUrl("");
        setLoading(false)
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Error while posting, please retry.");
        setLoading(false)
      }
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred, please try again.");
      setLoading(false)
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center mb-[100px]">
        <h2 className="font-bold text-2xl my-3 md:mt-5 mt-[40px]">Create a post</h2>
        <div className="w-[90%] bg-gray-200 p-5 rounded-xl mb-6">
          <form onSubmit={handleSubmit}>
            <div>
              <div
                id="uploadButton"
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded inline-block"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Upload Image
              </div>
              <span id="fileName" className="ml-2">
                {fileName}
              </span>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="my-2">
              {imagePreviewUrl ? (
                <img src={imagePreviewUrl} alt="Preview" className="w-full" />
              ) : (
                <p>No image selected</p>
              )}
            </div>
            <div className="my-3">
              <h3 className="font-bold text-lg">Description</h3>
              <textarea
                placeholder="Enter Your description here"
                className="h-[200px] w-full outline-none p-3 border border-gray-400 rounded-xl"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <button className="bg-blue-600 rounded-xl text-white py-2 w-full text-xl">
              {loading ? "Posting..." : "Post" }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
