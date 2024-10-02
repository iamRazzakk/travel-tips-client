"use client";

import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

import CustomForm from "@/src/components/Form/CustomForm/CustomForm";
import TLabel from "@/src/components/Form/TLabel/TLabel";
import TInput from "@/src/components/Form/TInput/TInput";
import TTextarea from "@/src/components/Form/TTextarea/TTextarea";

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const onSubmit = (data: any) => {
    const { fullName, email, password, confirmPassword, bio, location } = data;

    // Reset error before validation
    setError(null);

    // Form validation logic
    if (password !== confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    // Handle successful registration (e.g., API call)
    console.log("Registration Data", {
      fullName,
      email,
      password,
      bio,
      location,
    });
    toast.success("User registration successfully");
  };

  return (
    <div className="space-y-3 p-6  bg-black/25 text-white lg:w-[40%] mx-auto rounded-lg shadow-md shadow-gray-900">
      <h1 className="text-3xl text-white text-center font-bold">
        Welcome to Travel TipsDestination Guides
      </h1>
      <CustomForm onSubmit={onSubmit}>
        {/* Full Name */}
        <div>
          <TLabel className="text-md " htmlFor="fullName">
            Full Name
          </TLabel>
          <TInput
            name="fullName"
            placeholder="Enter your full name"
            type="text"
          />
        </div>

        {/* Email */}
        <div>
          <TLabel className="text-md " htmlFor="email">
            Email
          </TLabel>
          <TInput name="email" placeholder="Enter your email" type="email" />
        </div>

        {/* Password */}
        <div>
          <TLabel className="text-md " htmlFor="password">
            Password
          </TLabel>
          <TInput
            name="password"
            placeholder="Create a password"
            type="password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <TLabel className="text-md " htmlFor="confirmPassword">
            Confirm Password
          </TLabel>
          <TInput
            name="confirmPassword"
            placeholder="Confirm your password"
            type="password"
          />
        </div>

        {/* Short Bio */}
        <div>
          <TLabel className="text-md " htmlFor="bio">
            Short Bio
          </TLabel>
          <TTextarea name="bio" />
        </div>

        {/* Country/Location */}
        <div>
          <TLabel className="text-md " htmlFor="location">
            Country/Location
          </TLabel>
          <TInput
            name="location"
            placeholder="Enter your country or location"
            type="text"
          />
        </div>

        {/* Display Errors */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <Button className="w-full" type="submit">
          Register
        </Button>
      </CustomForm>

      {/* Google Signup Button */}
      <div className="flex items-center justify-center gap-4 ">
        <Button className="text-2xl">
          <FcGoogle />
        </Button>
        <Button className="text-2xl">
          <FaGithub />
        </Button>
      </div>
    </div>
  );
};

export default Register;
