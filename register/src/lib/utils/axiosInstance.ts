import axios from "axios";

export const axiosInstance = (isAppService: boolean = true) => {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_LINK ?? "";
  let baseUrl: URL;

  try {
    baseUrl = new URL(rawBaseUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_API_LINK must be a valid HTTPS URL");
  }

  if (baseUrl.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_API_LINK must be a valid HTTPS URL");
  }

  const baseURL = isAppService
    ? rawBaseUrl
    : rawBaseUrl.replace(/\/services\/app\/?$/, "");

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    beforeRedirect: (options) => {
      if (options.protocol !== "https:") {
        throw new Error("Refusing to follow an insecure HTTP redirect");
      }
    },
  });

  instance.interceptors.request.use((config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
};