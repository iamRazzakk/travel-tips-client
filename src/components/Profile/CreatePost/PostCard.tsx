/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import { IPost } from "@/src/types/PostTypes/PostTypes";
import Image from "next/image";

const PostCard = ({ post }: { post: IPost }, { user }) => {
  // console.log(user);
  return (
    <div className=" shadow-sm shadow-white rounded-lg p-4 mb-4">
      <h1 className="text-xl font-bold">{post?.title}</h1>
      <p className="text-gray-700 mt-2">{post?.content}</p>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {post?.images.map((image, index) => (
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
        <span className="text-gray-500">2 minutes ago</span>{" "}
        {/* Example time stamp */}
      </div>
    </div>
  );
};

export default PostCard;
