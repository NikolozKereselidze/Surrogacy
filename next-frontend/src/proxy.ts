import { NextRequest, NextResponse } from "next/server";

const supportedLocales = new Set(["en", "he", "zh", "ru", "es", "ka"]);
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
    if (!apiBase || !cookie) return false;
    try {
        const response = await fetch(`${apiBase}/api/auth/${endpoint}`, {
            method: "POST",
            headers: { cookie },
        });
        return response.ok;
    } catch {
        return false;
    }
}

function isDonorProtectedPath(pathname: string): boolean {
    return donorProtectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function noIndexRedirect(url: URL) {
    const response = NextResponse.redirect(url);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAdminPath = pathname.startsWith("/admin");
    const isDonorPath = isDonorProtectedPath(pathname);
    const isLoginPath = pathname === donorLoginPath || pathname === adminLoginPath || pathname.startsWith("/login/");
    const [isAdminAuthorized, isDonorAuthorized] = await Promise.all([
        isAdminPath || (isLoginPath && pathname === adminLoginPath)
            ? checkToken(request, "admin/check-token")
            : Promise.resolve(false),
        isDonorPath || (isLoginPath && pathname === donorLoginPath)
            ? checkToken(request, "donor/check-token")
            : Promise.resolve(false),
    ]);

    if (isAdminPath && !isAdminAuthorized) {
        return noIndexRedirect(new URL(adminLoginPath, request.url));
    }
    if (isDonorPath && !isDonorAuthorized) {
        return noIndexRedirect(new URL(donorLoginPath, request.url));
    }
    if (isLoginPath) {
        if (pathname === adminLoginPath && isAdminAuthorized) {
            return noIndexRedirect(new URL("/admin/dashboard", request.url));
        }
        if (pathname === donorLoginPath && isDonorAuthorized) {
            return noIndexRedirect(new URL("/find-egg-donor", request.url));
        }
    }

    const localeSegment = pathname.split("/")[1];
    const locale = supportedLocales.has(localeSegment) ? localeSegment : "en";
    const response = NextResponse.next();
    response.headers.set("Content-Language", locale);
    return response;
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
