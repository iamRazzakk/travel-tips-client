"use client";

import { useState, useEffect } from "react";
import nexiosInstance from "@/src/config/nexios.config";
import PostCard from "./PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await nexiosInstance.get(
          "http://localhost:5001/api/v1/post",
          {
            cache: "no-store",
          }
        );
        console.log("API Response:", response.data); // Log API response
        setPosts(response?.data?.data); // Adjust according to your response structure
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Posts;
