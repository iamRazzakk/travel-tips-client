import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";

import { TUSER } from "@/src/types/userTypes/user.types";
import { getCurrentUser } from "@/src/services/AuthService";
import ProfileFormModal from "@/src/components/Profile/ProfileFromModal/ProfileFrom";
import CreatePost from "@/src/components/Profile/CreatePost/CreatePost";
import Posts from "@/src/components/Profile/CreatePost/Posts";

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
    posts: 10,
    followers: 100,
    following: 50,
    isVerified: false,
    image: "/placeholder-profile.png",
  };

  // Use static data if user data is not available
  const profileData = user || staticData;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* user details */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Image
            alt="User Profile Picture"
            className="rounded-full border border-white"
            height={80}
            src={staticData.image}
            width={80}
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p>Followers {staticData.followers}</p>
            <p>Following {staticData.following}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ProfileFormModal initialData={profileData} />
          <Button color="primary">Varifiey now</Button>
        </div>
      </div>
      {/* user post */}
      <Divider className="my-4" />
      <div className="flex items-center gap-4">
        <div className="w-1/3 bg-red-500">adsf</div>
        {/* post list */}
        <div className="w-2/3 ">
          {/* create post */}
          <CreatePost user={user} />
          {/* total post */}
          <div>
            <Posts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
