import axios from "axios";

import { getToken } from "./auth";

const url = process.env.NEXT_PUBLIC_REACT_MS_NOTIFICATION;

const notificationApi = axios.create({
  baseURL: url,
  timeout: 100000,
});

notificationApi.interceptors.response.use((response) => {
  // response data

  return response;
});
notificationApi.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export default notificationApi;
