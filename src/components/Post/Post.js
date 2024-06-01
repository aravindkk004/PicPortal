import PostItem from "./PostItem";

const Post = ({ post }) => {
  if (!Array.isArray(post)) {
    return (
      <p className="text-center text-xl font-bold bg-gray-200 flex items-center justify-center w-[100%] h-[200px] rounded-xl mt-10">
        No posts available
      </p>
    );
  }
  const flattenedPosts = post.reduce((acc, postGroup) => {
    if (Array.isArray(postGroup.posts)) {
      const postsWithGroup = postGroup.posts.map((p) => {
        console.log("Post:", p);
        return { ...p, group: postGroup };
      });
      return acc.concat(postsWithGroup);
    }
    return acc;
  }, []);
  const sortedPosts = flattenedPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  return (
    <>
      <h2 className="text-center font-bold sm:text-3xl text-2xl sm:mt-6 mt-[40px]">
        Posts
      </h2>
      {sortedPosts.length > 0 ? (
        sortedPosts.map((p) => <PostItem key={p._id} post={p.group} p={p} />)
      ) : (
        <p className="text-center text-xl font-bold bg-gray-200 flex items-center justify-center w-[100%] h-[200px] rounded-xl mt-10">
          No posts available
        </p>
      )}
    </>
  );
};

export default Post;
