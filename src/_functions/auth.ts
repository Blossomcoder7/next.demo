
// api/auth.ts
import { httpAPI } from "@/_utils/httpAPI";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (data: any) => {
  const response = await httpAPI.post(`/api/user/register`, data);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerClient = async (data: any) => {
  const response = await httpAPI.post(`/api/client/register`, data);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLoginApi = async (data: any) => {
  const response = await httpAPI.post(`/api/login`, data);
  return response.data;
};

export const userLogout = async () => {
  const response = await httpAPI.get(`/api/logout`);
  return response.data;
};
