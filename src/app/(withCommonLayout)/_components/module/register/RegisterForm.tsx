"use client";
import CustomForm from "@/src/components/Form/CustomForm/CustomForm";
import TInput from "@/src/components/Form/TInput/TInput";
import TLabel from "@/src/components/Form/TLabel/TLabel";
import TTextarea from "@/src/components/Form/TTextarea/TTextarea";
import { signUpUser } from "@/src/services/AuthService";
import { Button } from "@nextui-org/button";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const RegisterForm = () => {
  const onSubmit = async (data: any) => {
    const { name, email, password, confirmPassword, bio, address } = data;

    // Reset error before validation
    // setError(null);
    try {
      await signUpUser(data);
      toast.success("Registration successful");
      // router.push("/login");
    } catch {
      toast.error("Singup Field");
    }
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
          <TInput name="name" placeholder="Enter your full name" type="text" />
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
            name="address"
            placeholder="Enter your country or location"
            type="text"
          />
        </div>

        {/* Display Errors */}
        {/* {error && <p className="text-red-500">{error}</p>} */}

        {/* Submit Button */}
        <Button className="w-full" type="submit">
          Register
        </Button>
        {/* Navigation to Register Page */}
        <p className="text-center mt-4">
          have an account?{" "}
          {/* <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login here
          </span> */}
        </p>
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

export default RegisterForm;
