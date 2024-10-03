/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
import axios from "axios";

import envConfig from "@/src/config/env.Config";

const axiosInstance = axios.create({
    baseURL: envConfig.baseAPi
});
export default axiosInstance;
