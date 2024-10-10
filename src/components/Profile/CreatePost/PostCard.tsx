"use client"; // Ensure this is a Client Component

import { IPost } from "@/src/types/PostTypes/PostTypes";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const PostCard = ({
  post,
  user,
  isCreatedByUser,
}: {
  post: IPost;
  user: any;
  isCreatedByUser: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [postContent, setPostContent] = useState(post);

  // Handle editing the post
  const handleEdit = async () => {
    if (isEditing) {
      try {
        const response = await axios.put(
          `http://localhost:5001/api/v1/post/${post._id}`,
          {
            title: postContent.title,
            content: postContent.content,
          }
        );
        setPostContent(response.data.data); // Update the post content after editing
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      setIsEditing(true);
    }
  };

  // Handle deleting the post
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/v1/post/${post._id}`);
      alert("Post deleted successfully!");
      // Optionally, trigger a re-fetch of posts in the parent component if needed
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="shadow-sm shadow-white rounded-lg p-4 mb-4">
      {isEditing ? (
        <input
          type="text"
          value={postContent.title}
          onChange={(e) =>
            setPostContent({ ...postContent, title: e.target.value })
          }
          className="text-xl font-bold border border-gray-300 rounded p-2 w-full"
        />
      ) : (
        <h1 className="text-xl font-bold">{postContent?.title}</h1>
      )}
      {isEditing ? (
        <textarea
          value={postContent.content}
          onChange={(e) =>
            setPostContent({ ...postContent, content: e.target.value })
          }
          className="text-gray-700 mt-2 border border-gray-300 rounded p-2 w-full"
        />
      ) : (
        <p className="text-gray-700 mt-2">{postContent?.content}</p>
      )}

      <div className="grid grid-cols-3 gap-2 mt-4">
        {postContent?.images.map((image, index) => (
          <div key={index} className="w-full h-32 relative">
            <Image
              src={image}
              alt={`Post image ${index + 1}`}
              layout="fill"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {isCreatedByUser && (
        <div className="mt-4 text-sm">
          <span className="text-green-500">You created this post!</span>
        </div>
      )}

      {post && (
        <div className="flex items-center space-x-2 mt-4">
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            Like
          </button>
          <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded">
            Comment
          </button>
          <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded">
            Share
          </button>
        </div>
        <span className="text-gray-500">2 minutes ago</span>
      </div>
    </div>
  );
};

export default PostCard;
