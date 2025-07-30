import { httpAPI } from "@/_utils/httpAPI";

export async function submitContactUsForm(data: any) {
  const response = await httpAPI.post("/api/contact-us", data);
  return response.data;
}
