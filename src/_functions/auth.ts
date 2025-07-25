// api/auth.ts
import { httpAPI } from "@/_utils/httpAPI";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (data: any) => {
  const response = await httpAPI.post(`/api/auth/user/register`, data);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerClient = async (data: any) => {
  const response = await httpAPI.post(`/api/auth/client/register`, data);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLoginApi = async (data: any) => {
  const response = await httpAPI.post(`/api/auth/login`, data);
  return response.data;
};
