import PostCard from "@/src/components/Profile/CreatePost/PostCard";
import { getCurrentUser } from "@/src/services/AuthService";
import { IPost } from "@/src/types/PostTypes/PostTypes";
import axios from "axios";

const HomePage = async () => {
  const user = await getCurrentUser();
  let posts: IPost[] = [];

  try {
    const response = await axios.get("http://localhost:5001/api/v1/post");
    posts = response.data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  // Handle edit and delete in the client-side component

  return (
    <div className="gap-3 w-1/3 mx-auto">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post: IPost) => (
          <PostCard
            key={post._id}
            post={post}
            user={user}
            isCreatedByUser={post?.user === user?._id}
          />
        ))
      )}
    </div>
  );
};

export default HomePage;
