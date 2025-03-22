import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import ClaimHistory from "@/models/ClaimHistory";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  await connectToDB();

  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const history = await ClaimHistory.find().sort({ timestamp: -1 });
    return NextResponse.json(history);
  } catch (error) {
    console.error("Get history error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}