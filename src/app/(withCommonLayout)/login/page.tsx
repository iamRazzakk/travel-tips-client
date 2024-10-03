"use client";

import { Button } from "@nextui-org/button";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";

import TInput from "@/src/components/Form/TInput/TInput";
import TLabel from "@/src/components/Form/TLabel/TLabel";
import loginUser from "@/src/services/AuthService";

const Login = () => {
  const methods = useForm();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    // Reset error before validation
    setError(null);

    // Simulate sign-in process
    if (!email || !password) {
      setError("Email and password are required");

      return;
    }
    const res = loginUser(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-4 p-6 border border-white bg-black/25 lg:w-2/3 mx-auto rounded-lg shadow-md"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div>
          <TLabel className="text-md font-semibold" htmlFor="email">
            Email
          </TLabel>
          <TInput
            required
            name="email"
            placeholder="Enter your email"
            type="email"
          />
        </div>

        <div>
          <TLabel className="text-md font-semibold" htmlFor="password">
            Password
          </TLabel>
          <TInput
            required
            name="password"
            placeholder="Enter your password"
            type="password"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit">Sign In</Button>

        {/* Navigation to Register Page */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/register")}
          >
            Register here
          </span>
        </p>
      </form>
    </FormProvider>
  );
};

export default Login;
