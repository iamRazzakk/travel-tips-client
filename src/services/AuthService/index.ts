"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import AxiosInstance from "@/src/lib/axiosInstance";


export const loginUser = async (userData) => {
  try {
    const response = await AxiosInstance.post("/auth/login", userData);
    const data = response.data; // Access the actual data from the response

    console.log(data); // This will help debug the structure of your response

    if (data.success) {
      // Set tokens in cookies during login
      cookies().set("accessToken", data.data.accessToken); // Corrected path to accessToken
      cookies().set("refreshToken", data.data.refreshToken); // Corrected path to refreshToken
    } else {
      throw new Error("Failed to login");
    }
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
};
export const signUpUser = async (userData) => {
  try {
    const { data } = await AxiosInstance.post("/auth/signup", userData);

    if (data.success) {
      // Set tokens in cookies during signup
      cookies().set("accessToken", data.accessToken);
      cookies().set("refreshToken", data.refreshToken);
    } else {
      throw new Error("Failed to signup");
    }

    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const logOut = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(accessToken);

    return decodedToken;
  } catch (error) {
    console.error("Failed to decode token:", error);

    return null;
  }
};
