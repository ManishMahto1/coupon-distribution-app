import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Coupon from "@/models/Coupon";
import ClaimHistory from "@/models/ClaimHistory";
import { rateLimit } from "@/lib/rateLimit";
import { generateSessionId } from "@/lib/utils";

export async function GET(request: NextRequest) {
  await connectToDB();

  const ip = request.headers.get('x-forwarded-for') || "unknown";
  const sessionId = request.cookies.get("sessionId")?.value || generateSessionId();

  const limited = await rateLimit(ip);
  if (limited) {
    return NextResponse.json(
      { message: `Please wait ${limited.ttl} seconds before next claim` },
      { status: 429 }
    );
  }

  try {
    const coupon = await Coupon.findOneAndUpdate(
      { isActive: true, claimed: false },
      {
        claimed: true,
        claimedAt: new Date(),
        claimedByIp: ip,
        claimedBySession: sessionId,
      },
      { sort: { createdAt: 1 }, new: true }
    );

    if (!coupon) {
      return NextResponse.json({ message: "No coupons available" }, { status: 404 });
    }

    await ClaimHistory.create({
      couponCode: coupon.code,
      ip,
      sessionId,
      timestamp: new Date(),
    });

    const response = NextResponse.json({
      message: "Coupon claimed successfully!",
      coupon: coupon.code,
    });
    response.cookies.set("sessionId", sessionId, { maxAge: 24 * 60 * 60, path: "/" });

    return response;
  } catch (error) {
    console.error("Claim error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}