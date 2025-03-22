"use client";

import { useState } from "react";
import { useClaimCoupon } from "@/hooks/useClaimCoupon";

interface CouponCardProps {
  coupon?: string;
  message?: string;
}

export default function CouponCard({ coupon: initialCoupon, message: initialMessage }: CouponCardProps) {
  const [coupon, setCoupon] = useState(initialCoupon || "");
  const [message, setMessage] = useState(initialMessage || "");
  const { claimCoupon, loading } = useClaimCoupon();

  const handleClaim = async () => {
    const result = await claimCoupon();
    setMessage(result.message);
    if (result.coupon) setCoupon(result.coupon);
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Claim Your Coupon</h2>
      <button
        onClick={handleClaim}
        disabled={loading}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? "Claiming..." : "Claim Coupon"}
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
      {coupon && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-lg font-semibold">Your Coupon: {coupon}</p>
        </div>
      )}
    </div>
  );
}