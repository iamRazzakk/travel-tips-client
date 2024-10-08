/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import Image from "next/image";

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <div className="lg:mt-8 md:mt-6 mt-4">
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <div className="grid grid-cols-3 gap-2">
          {post?.images?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Post image ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
