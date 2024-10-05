import Image from "next/image";

import logo from "../../../../assets/logo.png";

import { getCurrentUser } from "@/src/services/AuthService";
import { TUSER } from "@/src/types/userTypes/user.types";

const Profile = async () => {
  const user: TUSER = await getCurrentUser();

  // Static fallback data if user is not found
  const staticData = {
    _id: "123456789",
    email: "johndoe@example.com",
    role: "USER",
    name: "John Doe",
    bio: "This is a static bio.",
    address: "123 Main St, Anytown, USA",
    iat: Math.floor(Date.now() / 1000) - 3600,
    exp: Math.floor(Date.now() / 1000) + 3600,
    posts: 10,
    followers: 100,
    following: 50,
    isVerified: false,
  };

  // Use static data if user data is not available
  const profileData = user || staticData;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

      {/* Profile Header */}
      <div className="flex items-center mb-6 border-b pb-4">
        <Image
          alt="Profile Picture"
          className="rounded-full object-cover border-2 border-gray-300"
          height={100}
          src={logo}
          width={100}
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{profileData.name}</h2>
          <p className="text-gray-500">{profileData.bio}</p>
          <p className="text-sm text-gray-400">Email: {profileData.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Follow/Unfollow Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Follow
        </button>
        {/* Profile Verification Section */}
        <div className="">
          <p>
            {profileData.isVerified ? (
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Verified
              </button>
            ) : (
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Pay for Verification
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Profile Statistics */}
      <div className="flex justify-around border-t border-b py-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{profileData.posts}</h3>
          <p className="text-gray-500">Posts</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">{profileData.followers}</h3>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">{profileData.following}</h3>
          <p className="text-gray-500">Following</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        {/* Example of user posts */}
        <div className=" shadow-md shadow-white p-4 rounded-lg mb-4 ">
          <h3 className="font-semibold">Post Title 1</h3>
          <p>This is a description of the post content...</p>
        </div>
        <div className=" shadow-md shadow-white p-4 rounded-lg mb-4 ">
          <h3 className="font-semibold">Post Title 2</h3>
          <p>This is another description of the post content...</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
