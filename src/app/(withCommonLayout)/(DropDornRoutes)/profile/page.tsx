import Image from "next/image";
import { getCurrentUser } from "@/src/services/AuthService";
import { TUSER } from "@/src/types/userTypes/user.types";
import nexiosInstance from "@/src/config/nexios.config";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";

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
    profileImage: "/placeholder-profile.png",
  };

  // Use static data if user data is not available
  const profileData = user || staticData;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* user details */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Image
            src={staticData.profileImage}
            alt="User Profile Picture"
            height={80}
            width={80}
            className="rounded-full border border-white"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p>Followers {staticData.followers}</p>
            <p>Following {staticData.following}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button color="default">Edit Profile</Button>
          <Button color="primary">Varifiey now</Button>
        </div>
      </div>
      {/* user post */}
      <Divider className="my-4" />
      <div className="flex items-center gap-4">
        <div className="w-1/3 bg-red-500">adsf</div>
        {/* post list */}
        <div className="w-2/3 bg-green-500">
          <div>
            <h1>al;sdkjfalskdjfal;skdjfla;k</h1>
            <p>alskdjfkla;sdjfl;kasdj</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
