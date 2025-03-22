"use client";

import { useState, useEffect } from "react";
import { getCoupons, toggleCoupon, deleteCoupon } from "@/services/admin.service";
import { Coupon } from "@/types";

export default function CouponList() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getCoupons();
        setCoupons(data);
      } catch (err) {
        console.error("Failed to fetch coupons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const handleToggle = async (id: string, isActive: boolean) => {
    await toggleCoupon(id, !isActive);
    setCoupons(coupons.map((c) => (c._id === id ? { ...c, isActive: !isActive } : c)));
  };

  const handleDelete = async (id: string) => {
    await deleteCoupon(id);
    setCoupons(coupons.filter((c) => c._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Coupons</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Code</th>
            <th className="p-2">Claimed</th>
            <th className="p-2">Active</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id} className="border-b">
              <td className="p-2">{coupon.code}</td>
              <td className="p-2">{coupon.claimed ? "Yes" : "No"}</td>
              <td className="p-2">{coupon.isActive ? "Yes" : "No"}</td>
              <td className="p-2">
                <button
                  onClick={() => handleToggle(coupon._id, coupon.isActive)}
                  className="mr-2 bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}