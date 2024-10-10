"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/v1/post");
        console.log("API Response:", response.data);
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error fetching posts: {error}</p>;
  if (posts.length === 0) return <p>No posts available.</p>;

  return (
    <div className="gap-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
