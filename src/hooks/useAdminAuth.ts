"use client";

import { useState, useEffect, useCallback } from "react";
import { verifyToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const logout = useCallback(() => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("adminToken");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/admin/login");
  }, [router]);

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken") || document.cookie.match(/token=([^;]+)/)?.[1];
    if (storedToken) {
      try {
        verifyToken(storedToken);
        setToken(storedToken);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    }
  }, [logout]);

  const login = (newToken: string) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem("adminToken", newToken);
    document.cookie = `token=${newToken}; path=/; max-age=${60 * 60 * 24}`;
  };

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
}