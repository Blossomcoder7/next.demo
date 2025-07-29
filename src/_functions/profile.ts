import { httpAPI } from "@/_utils/httpAPI";

export const fetchProfile = async (userType: string) => {
  const response = await httpAPI.get(`/api/${userType}/profile/data`);
  return response.data.data;
};

export const refreshAuth = async () => {
  const response = await httpAPI.get(`/api/login`);
  return response.data;
};

export const updateAvatar = async (
  url: string,
  userType: string,
  next?: (response: any) => Promise<void> | void
) => {
  try {
    console.log({ url, userType });
    const response = await httpAPI.post(`/api/${userType}/profile/avatar`, {
      url,
    });
    console.log({ response });
    if (response?.status === 200) {
      await next?.(response);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};
