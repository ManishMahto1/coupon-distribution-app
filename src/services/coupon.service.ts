export async function claimCoupon(): Promise<{ message: string; coupon?: string }> {
  const response = await fetch("/api/claim", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to claim coupon");
  }

  return data;
}