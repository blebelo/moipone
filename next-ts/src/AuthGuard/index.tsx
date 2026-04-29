"use client";

import { useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";


const WithAuth = ({ children }: {children: ReactNode}) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.replace("/admin");
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (authorized === null) return null; 
  if (!authorized) return null;

  return <>{children}</>;
};

export default WithAuth;