import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Coupon from "@/models/Coupon";
import { verifyToken } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDB();

  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const { isActive } = await request.json();

  try {
    const coupon = await Coupon.findByIdAndUpdate(id, { isActive }, { new: true });
    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }
    return NextResponse.json(coupon);
  } catch (error) {
    console.error("Update coupon error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDB();

  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Coupon deleted" });
  } catch (error) {
    console.error("Delete coupon error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}