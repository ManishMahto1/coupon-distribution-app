import { Coupon, ClaimHistory as ClaimHistoryType } from "@/types";

export async function adminLogin(credentials: { email: string; password: string }): Promise<{ token: string }> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
}

export async function getCoupons(): Promise<Coupon[]> {
  const response = await fetch("/api/coupons", {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch coupons");
  }

  return response.json();
}

export async function toggleCoupon(id: string, isActive: boolean): Promise<void> {
  const response = await fetch(`/api/coupons/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify({ isActive: !isActive }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to toggle coupon");
  }
}

export async function deleteCoupon(id: string): Promise<void> {
  const response = await fetch(`/api/coupons/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete coupon");
  }
}

export async function getClaimHistory(): Promise<ClaimHistoryType[]> {
  const response = await fetch("/api/history", {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch claim history");
  }

  return response.json();
}