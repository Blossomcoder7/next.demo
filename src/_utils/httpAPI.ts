import axios from "axios";

export const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const httpAPI = axios.create({
  withCredentials: true,
  baseURL: backendBaseURL,
  timeout: 2000,
});
