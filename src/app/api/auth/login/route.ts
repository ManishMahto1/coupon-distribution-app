import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Admin from "@/models/Admin";
/* import { comparePassword } from "@/lib/auth"; */
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connectToDB();

  const { email } = await request.json();

  try {
    const admin = await Admin.findOne({ email });
   /*  if (!admin || !(await comparePassword(password, admin.password))) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    } */

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}