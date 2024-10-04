"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/src/lib/axiosInstance";

export const loginUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data.accessToken);
      cookies().set("refreshToken", data.refreshToken);
    } else {
      throw new Error("Failed to login");
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
