import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Coupon from "@/models/Coupon";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  await connectToDB();

  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const coupons = await Coupon.find().sort({ createdAt: 1 });
    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Get coupons error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectToDB();

  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { code } = await request.json();

  try {
    const coupon = await Coupon.create({
      code,
      isActive: true,
      claimed: false,
      createdAt: new Date(),
    });
    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    console.error("Create coupon error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}