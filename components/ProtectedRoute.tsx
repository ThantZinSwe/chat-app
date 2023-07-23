"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token") || null;
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");

      return;
    }

    router.push("/");
  }, [router, token]);

  return <>{children}</>;
};

export default ProtectedRoute;
