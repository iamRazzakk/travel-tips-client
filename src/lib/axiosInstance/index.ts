"use server"
import envConfig from "@/src/config/env.Config";
import axios from "axios";

import { cookies } from "next/headers";

const AxiosInstance = axios.create({
    baseURL: envConfig.baseAPi,
});

// Add a request interceptors
AxiosInstance.interceptors.request.use(
    function (config) {
        const cookieStore = cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (accessToken) {
            config.headers.Authorization = accessToken;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default AxiosInstance;