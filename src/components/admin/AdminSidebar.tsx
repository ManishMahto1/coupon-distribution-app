"use client"; // Add this at the top

import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const { logout } = useAdminAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/admin/dashboard" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/coupons" className="block p-2 hover:bg-gray-700 rounded">
              Manage Coupons
            </Link>
          </li>
          <li>
            <Link href="/admin/history" className="block p-2 hover:bg-gray-700 rounded">
              Claim History
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left p-2 hover:bg-red-600 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}