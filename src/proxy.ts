import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getProtectedRouteRedirect } from "@/auth/route-guard";

export const proxy = auth((request) => {
  const redirectUrl = getProtectedRouteRedirect(request.url, request.auth);
  return redirectUrl ? NextResponse.redirect(redirectUrl) : NextResponse.next();
});

export const config = {
  matcher: ["/wiki/:path*", "/onboarding/:path*"],
};
