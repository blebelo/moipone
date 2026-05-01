"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { decodeToken } from "../utils/decoder";

const WithAuth = ({ children }: {children: ReactNode}) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
 
  useEffect(() => {
    const token = sessionStorage.getItem("token");
 
    if (!token) {
      router.replace("/admin");
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
      sessionStorage.removeItem("token");
      router.replace("/admin");
      setAuthorized(false);
    }
  }, [router]);
 
  if (authorized === null) return null;
  if (!authorized) return null;
 
  return <>{children}</>;
};
 
export default WithAuth;