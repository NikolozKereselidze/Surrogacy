import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const donorToken = cookieStore.get("donorToken");

  if (!donorToken) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  // Verify the JWT token
  const secret = process.env.JWT_SECRET || "";
  try {
    const decoded = verify(donorToken.value, secret);

    return NextResponse.json({ success: true, user: decoded });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
