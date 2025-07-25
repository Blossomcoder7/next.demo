import { httpAPI } from "@/_utils/httpAPI";

export const fetchProfile = async (userType: string) => {
  const response = await httpAPI.get(`/api/v1/${userType}/profile`);
  return response.data;
};

export const refreshAuth = async () => {
  const response = await httpAPI.get(`/api/auth/login`);
  return response.data;
};
