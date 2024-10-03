"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/src/lib/axiosInstance";
export const loginUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    console.log(data);
    if (data.success) {
      cookies().set("accessToken", data?.accessToken);
      cookies().set("refreshToken", data?.refreshToken);
    } else {
      throw new Error("Failed to login");
    }
  } catch (error) {
    throw new Error(error?.message);
  }
};
export const logOut = () => {

  cookies().set("accessToken", "");
  cookies().set("refreshToken", "");
};
export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decordedToken = null;

  if (accessToken) {
    decordedToken = await jwtDecode(accessToken);
    // console.log(decordedToken);
    return {
      _id: decordedToken._id,
      name: decordedToken.name,
      email: decordedToken.email,
      role: decordedToken.role,
    }
  }
};
