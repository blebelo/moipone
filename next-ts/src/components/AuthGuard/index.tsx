"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { decodeToken } from "../../lib/utils/decoder";

interface WithAuthProps {
  children: ReactNode;
  redirectTo?: string;
}

const getDefaultRedirectPath = () => {
  if (typeof window === "undefined") {
    return "/admin";
  }

  const host = window.location.host.toLowerCase();
  if (host.startsWith("student.")) {
    return "/student";
  }

  return "/admin";
};

const WithAuth = ({ children, redirectTo }: WithAuthProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
 
  useEffect(() => {
    const unauthorizedRedirect = redirectTo || getDefaultRedirectPath();
    const token = localStorage.getItem("token");
 
    if (!token) {
      router.replace(unauthorizedRedirect);
      setAuthorized(false);
      return;
    }
 
    try {
      const payload = decodeToken(token);
      const exp = Number(payload.exp);
      
      if (!exp || Date.now() >= exp * 1000) {
        throw new Error("Token expired or missing exp claim");
      }
 
      setAuthorized(true);
    } catch {
      localStorage.removeItem("token");
      router.replace(unauthorizedRedirect);
      setAuthorized(false);
    }
  }, [redirectTo, router]);
 
  if (authorized === null) return null;
  if (!authorized) return null;
 
  return <>{children}</>;
};
 
export default WithAuth;
