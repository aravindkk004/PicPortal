// import PostItem from "@components/Post/PostItem";

// const SavedPost = ({ post }) => {
//   const renderedPostIds = new Set();

//   return (
//     <>
//       <h2 className="text-center font-bold text-2xl mt-6">Saved Posts</h2>
//       {post.list.length > 0 ? (
//         post.list.map((postGroup) =>
//           postGroup.posts.map((p) => {
//             if (post.ids.includes(p._id) && !renderedPostIds.has(p._id)) {
//               renderedPostIds.add(p._id);
//               return <PostItem key={p._id} post={postGroup} p={p} />;
//             } else {
//               return null;
//             }
//           })
//         )
//       ) : (
//         <p className="text-center text-xl font-bold bg-gray-200 flex items-center justify-center w-[80%] h-[200px] rounded-xl mt-10">No posts available</p>
//       )}
//     </>
//   );
// };

// export default SavedPost;

import PostItem from "@components/Post/PostItem";

const SavedPost = ({ post }) => {
  const renderedPostIds = new Set();

  // Flatten the posts into a single array
  const allPosts = post.list.flatMap(postGroup => postGroup.posts);

  // Sort posts by createdAt and updatedAt times
  allPosts.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt);
    const dateB = new Date(b.updatedAt || b.createdAt);
    return dateB - dateA;
  });

  return (
    <>
      <h2 className="text-center font-bold text-2xl mt-6">Saved Posts</h2>
      {allPosts.length > 0 ? (
        allPosts.map((p) => {
          if (post.ids.includes(p._id) && !renderedPostIds.has(p._id)) {
            renderedPostIds.add(p._id);
            // Find the postGroup for the current post
            const postGroup = post.list.find(group => group.posts.includes(p));
            return <PostItem key={p._id} post={postGroup} p={p} />;
          } else {
            return null;
          }
        })
      ) : (
        <p className="text-center text-xl font-bold bg-gray-200 flex items-center justify-center w-[80%] h-[200px] rounded-xl mt-10">No posts available</p>
      )}
    </>
  );
};

export default SavedPost;
