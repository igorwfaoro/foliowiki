import { describe, expect, it } from "vitest";
import { getProtectedRouteRedirect } from "./route-guard";

describe("getProtectedRouteRedirect", () => {
  it("sends signed-out visitors to sign-in and preserves their destination", () => {
    const redirect = getProtectedRouteRedirect(
      "https://wiki.example/wiki/engineering?q=design",
      null,
    );

    expect(redirect).toBe(
      "https://wiki.example/signin?callbackUrl=%2Fwiki%2Fengineering%3Fq%3Ddesign",
    );
  });

  it("sends expired Google authorization through a recoverable sign-in flow", () => {
    const redirect = getProtectedRouteRedirect("https://wiki.example/wiki", {
      error: "RefreshTokenError",
    });

    expect(redirect).toBe(
      "https://wiki.example/signin?callbackUrl=%2Fwiki&error=reauth",
    );
  });

  it("allows a valid session", () => {
    expect(
      getProtectedRouteRedirect("https://wiki.example/wiki", {}),
    ).toBeNull();
  });
});
