export function getProtectedRouteRedirect(
  requestUrl: string,
  session: { error?: string } | null,
): string | null {
  if (session && session.error !== "RefreshTokenError") return null;

  const request = new URL(requestUrl);
  const signInUrl = new URL("/signin", request);
  signInUrl.searchParams.set(
    "callbackUrl",
    `${request.pathname}${request.search}`,
  );

  if (session?.error === "RefreshTokenError") {
    signInUrl.searchParams.set("error", "reauth");
  }

  return signInUrl.toString();
}
