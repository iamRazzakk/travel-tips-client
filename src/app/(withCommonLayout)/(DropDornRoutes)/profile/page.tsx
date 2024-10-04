// pages/profile.tsx
import Image from "next/image";

import logo from "../../../../assets/logo.png";
import { getCurrentUser } from "@/src/services/AuthService";
const Profile = async () => {
  const user = await getCurrentUser();
  console.log(user, "my user");
  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];

  //     if (file) {
  //       // Simulate handling image upload (for now)
  //       console.log("Selected file:", file);
  //     }
  //   };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">My Profile</h1>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <Image
          alt="Profile Picture"
          className="rounded-full object-cover mb-4"
          height={150}
          src={logo}
          width={150}
        />
        <input
          className="border border-gray-300 rounded p-2"
          type="file"
          //   onChange={handleImageChange}
        />
      </div>

      {/* User Details */}
      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name:
          </label>
          {/* _id: '66fdea14710fd367b7081f88',
  email: 'rima@gmail.com',
  role: 'USER',
  iat: 1728025883, */}
          exp: 1730617883
          <input
            readOnly
            className="border border-gray-300 rounded p-2 w-full"
            defaultValue={user?.name}
            id="name"
            name="name"
            type="text"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            readOnly
            className="border border-gray-300 rounded p-2 w-full"
            defaultValue={user.email}
            id="email"
            name="email"
            type="email"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="bio"
          >
            Bio:
          </label>
          <input
            readOnly
            className="border border-gray-300 rounded p-2 w-full"
            defaultValue={user.bio}
            id="bio"
            name="bio"
            type="text"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="address"
          >
            Address:
          </label>
          <input
            readOnly
            className="border border-gray-300 rounded p-2 w-full"
            defaultValue={user.address}
            id="address"
            name="address"
            type="text"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="role"
          >
            Role:
          </label>
          <input
            readOnly
            className="border border-gray-300 rounded p-2 w-full"
            defaultValue="USER"
            id="role"
            name="role"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
