import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

// Store failed attempts by IP (in memory)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

// Config
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 10;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const attempt = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };

  // Reset counter if window expired
  if (now - attempt.lastAttempt > WINDOW_MS) {
    attempt.count = 0;
  }

  attempt.count += 1;
  attempt.lastAttempt = now;

  loginAttempts.set(ip, attempt);

  if (attempt.count > MAX_ATTEMPTS) {
    return NextResponse.json(
      { message: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { username, password } = body;

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  if (!password) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  if (username !== process.env.DONOR_ACCESS_USERNAME) {
    return NextResponse.json({ message: "Invalid username" }, { status: 401 });
  }

  if (password !== process.env.DONOR_ACCESS_PASSWORD) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET || "";

  const token = sign(
    {
      password,
    },
    secret,
    {
      expiresIn: "2h",
    }
  );

  const serialized = serialize("donorToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 60 * 60, // 2 hours
    path: "/",
  });

  const response = { message: "Authenticated" };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}
