import axios from "axios";

const LOGIN_PATH_BY_SUBDOMAIN: Record<string, string> = {
  admin: "/admin",
  student: "/student",
};

const getUnauthorizedRedirectPath = () => {
  if (globalThis.window === undefined) return null;

  const { hostname, pathname } = new URL(globalThis.window.location.href);
  const subdomainRedirect = LOGIN_PATH_BY_SUBDOMAIN[hostname.split(".")[0]];

  if (subdomainRedirect) return subdomainRedirect;

  if (/^\/(student|withdraw)(\/|$)/.test(pathname)) {
    return "/student";
  }

  if (/^\/admin(\/|$)/.test(pathname)) {
    return "/admin";
  }

  return null;
};

export const axiosInstance = (isAppService: boolean = true) => {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_LINK ?? "";

  const baseURL = isAppService
    ? rawBaseUrl
    : rawBaseUrl.replace(/\/services\/app\/?$/, "");

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = globalThis.window === undefined ? null : localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (globalThis.window !== undefined && error.response?.status === 401) {
        const hadToken = Boolean(localStorage.getItem("token"));
        const redirectPath = getUnauthorizedRedirectPath();

        localStorage.removeItem("token");
        sessionStorage.clear();

        const currentPath = globalThis.window.location.pathname.replace(/\/$/, "") || "/";

        if (
          hadToken &&
          redirectPath &&
          currentPath !== redirectPath
        ) {
          globalThis.location.replace(redirectPath);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
