"use server";

import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/src/lib/axiosInstance";

export const loginUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
};
export const signUpUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);

    if (data.success) {
      // Set tokens in cookies during signup
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } else {
      throw new Error("Failed to signup");
    }

    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const logOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = localStorage.getItem("accessToken");

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
