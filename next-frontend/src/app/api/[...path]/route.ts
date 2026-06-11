import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function proxyRequest(
  req: NextRequest,
  params: Promise<{ path: string[] }>,
): Promise<NextResponse> {
  const { path } = await params;
  const backendPath = path.join("/");
  const url = new URL(req.url);
  const backendUrl = `${BACKEND_BASE}/api/${backendPath}${url.search}`;

  const headers: Record<string, string> = {};

  const contentType = req.headers.get("content-type");
  if (contentType) {
    headers["content-type"] = contentType;
  }

  // Forward the httpOnly cookies so the backend can verify the JWT
  const cookie = req.headers.get("cookie");
  if (cookie) {
    headers["cookie"] = cookie;
  }

  const fetchOptions: RequestInit = { method: req.method, headers };

  if (req.method !== "GET" && req.method !== "HEAD") {
    fetchOptions.body = await req.text();
  }

  try {
    const backendRes = await fetch(backendUrl, fetchOptions);
    const responseText = await backendRes.text();

    const responseHeaders: Record<string, string> = {};
    const responseContentType = backendRes.headers.get("content-type");
    if (responseContentType) {
      responseHeaders["content-type"] = responseContentType;
    }

    return new NextResponse(responseText, {
      status: backendRes.status,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json({ message: "Proxy error" }, { status: 502 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, params);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, params);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, params);
}
