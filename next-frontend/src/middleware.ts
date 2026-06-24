import { NextRequest, NextResponse } from "next/server";
const donorProtectedPrefixes = [
    "/find-egg-donor",
    "/find-sperm-donor",
    "/find-surrogate-donor",
    "/egg-donors",
    "/sperm-donors",
    "/surrogate-donors",
];
const adminLoginPath = "/login/admin";
const donorLoginPath = "/login";
async function checkToken(request: NextRequest, endpoint: "admin/check-token" | "donor/check-token"): Promise<boolean> {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookie = request.headers.get("cookie");
    if (!apiBase || !cookie) {
        return false;
    }
    try {
        const response = await fetch(`${apiBase}/api/auth/${endpoint}`, {
            method: "POST",
            headers: {
                cookie,
            },
        });
        return response.ok;
    }
    catch {
        return false;
    }
}
function isDonorProtectedPath(pathname: string): boolean {
    return donorProtectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAdminPath = pathname.startsWith("/admin");
    const isDonorPath = isDonorProtectedPath(pathname);
    const isLoginPath = pathname === donorLoginPath ||
        pathname === adminLoginPath ||
        pathname.startsWith("/login/");
    const [isAdminAuthorized, isDonorAuthorized] = await Promise.all([
        isAdminPath || (isLoginPath && pathname === adminLoginPath)
            ? checkToken(request, "admin/check-token")
            : Promise.resolve(false),
        isDonorPath || (isLoginPath && pathname === donorLoginPath)
            ? checkToken(request, "donor/check-token")
            : Promise.resolve(false),
    ]);
    if (isAdminPath && !isAdminAuthorized) {
        return NextResponse.redirect(new URL(adminLoginPath, request.url));
    }
    if (isDonorPath && !isDonorAuthorized) {
        return NextResponse.redirect(new URL(donorLoginPath, request.url));
    }
    if (isLoginPath) {
        if (pathname === adminLoginPath && isAdminAuthorized) {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
        if (pathname === donorLoginPath && isDonorAuthorized) {
            return NextResponse.redirect(new URL("/find-egg-donor", request.url));
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        "/(en|he|zh|ru|es|ka)(.*)",
        "/admin/:path*",
        "/find-egg-donor/:path*",
        "/find-sperm-donor/:path*",
        "/find-surrogate-donor/:path*",
        "/egg-donors/:path*",
        "/sperm-donors/:path*",
        "/surrogate-donors/:path*",
        "/login",
        "/login/:path*",
    ],
};
