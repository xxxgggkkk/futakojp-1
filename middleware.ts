import { NextResponse, type NextRequest } from "next/server";

function isLocalHost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.startsWith("10.") ||
    hostname.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  );
}

export function middleware(request: NextRequest) {
  if (process.env.BLOCK_PUBLIC_ADMIN !== "true") {
    return NextResponse.next();
  }

  const { pathname, hostname } = request.nextUrl;
  const hostHeader = request.headers.get("host")?.split(":")[0];
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(":")[0];
  const hostnames = [hostname, hostHeader, forwardedHost].filter(Boolean) as string[];
  const hasPublicHost = hostnames.some((host) => !isLocalHost(host));

  if (pathname.startsWith("/admin") && hasPublicHost) {
    return new NextResponse("Admin is only available on the local network.", {
      status: 403
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
