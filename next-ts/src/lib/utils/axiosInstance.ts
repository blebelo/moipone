import axios from "axios";

export const axiosInstance = (isAppService: boolean = true) => {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("token")
      : null;

  const rawBaseUrl = process.env.NEXT_PUBLIC_API_LINK ?? "";

  const baseURL = isAppService
    ? rawBaseUrl
    : rawBaseUrl.replace(/\/services\/app\/?$/, "");

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};