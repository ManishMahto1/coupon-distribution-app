"use client"; // Hook runs on the client side

import { useState } from "react";
import { claimCoupon as claimCouponService } from "@/services/coupon.service";
import { MESSAGES } from "@/constants/messages";

export function useClaimCoupon() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const claimCoupon = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await claimCouponService();
      setLoading(false);

      if (response.coupon) {
        return {
          message: MESSAGES.COUPON_CLAIMED,
          coupon: response.coupon,
        };
      } else {
        throw new Error(response.message || MESSAGES.NO_COUPONS);
      }
    } catch (err: unknown) {
      setLoading(false);
      const message = err instanceof Error ? err.message : MESSAGES.CLAIM_FAILED;
      setError(message);
      return { message };
    }
  };

  return {
    claimCoupon,
    loading,
    error,
  };
}