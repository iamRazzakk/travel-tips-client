"use server"
import { Nexios } from "nexios-http";
import { cookies } from "next/headers";

const nexiosInstance = new Nexios({
  baseURL: "http://localhost:5001/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${cookies()?.get("accessToken").value}`,
  },
});

export default nexiosInstance;
