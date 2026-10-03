import { getToken } from "next-auth/jwt";
import { refreshGoogleAccessToken } from "@/auth/token-refresh";

export type GoogleAccessResult =
  | { status: "authenticated"; accessToken: string; userId?: string }
  | { status: "unauthenticated" }
  | { status: "reauthentication-required" };

export async function getGoogleAccess(
  request: Request,
): Promise<GoogleAccessResult> {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  if (!token || typeof token.accessToken !== "string") {
    return { status: "unauthenticated" };
  }
  if (token.error === "RefreshTokenError") {
    return { status: "reauthentication-required" };
  }

  const currentToken = await refreshGoogleAccessToken(token);
  if (currentToken.error === "RefreshTokenError" || !currentToken.accessToken) {
    return { status: "reauthentication-required" };
  }

  return {
    status: "authenticated",
    accessToken: currentToken.accessToken,
    userId: typeof token.email === "string" ? token.email : token.sub,
  };
}
