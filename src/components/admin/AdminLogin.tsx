"use client";

import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { adminLogin } from "@/services/admin.service";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await adminLogin({ email, password });
      login(token);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}