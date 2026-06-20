import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const body = await req.json();
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/donor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const data = await backendRes.json();
    if (!backendRes.ok) {
        return NextResponse.json(data, { status: backendRes.status });
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.set("donorToken", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2 * 60 * 60,
        path: "/",
    });
    return response;
}
