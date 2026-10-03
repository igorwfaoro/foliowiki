import { describe, expect, it, vi } from "vitest";
import { refreshGoogleAccessToken } from "./token-refresh";

describe("refreshGoogleAccessToken", () => {
  it("keeps a valid access token without calling Google", async () => {
    const fetcher = vi.fn<typeof fetch>();
    const token = {
      accessToken: "current-access-token",
      accessTokenExpiresAt: 2_000_000,
      refreshToken: "refresh-token",
    };

    await expect(
      refreshGoogleAccessToken(token, { now: 1_000_000, fetcher }),
    ).resolves.toEqual(token);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("refreshes an expired token and preserves or rotates the refresh token", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({
        access_token: "new-access-token",
        expires_in: 3600,
        refresh_token: "rotated-refresh-token",
      }),
    );
    const token = {
      accessToken: "expired-access-token",
      accessTokenExpiresAt: 900_000,
      refreshToken: "old-refresh-token",
    };

    await expect(
      refreshGoogleAccessToken(token, {
        now: 1_000_000,
        clientId: "client-id",
        clientSecret: "client-secret",
        fetcher,
      }),
    ).resolves.toEqual({
      accessToken: "new-access-token",
      accessTokenExpiresAt: 4_600_000,
      refreshToken: "rotated-refresh-token",
      error: undefined,
    });

    const [, request] = fetcher.mock.calls[0];
    expect(request?.method).toBe("POST");
    expect(request?.cache).toBe("no-store");
    expect(String(request?.body)).toContain("grant_type=refresh_token");
    expect(String(request?.body)).toContain("refresh_token=old-refresh-token");
  });

  it("preserves the prior refresh token when Google does not rotate it", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        Response.json({ access_token: "new-token", expires_in: 3600 }),
      );

    const result = await refreshGoogleAccessToken(
      {
        accessToken: "expired-token",
        accessTokenExpiresAt: 900_000,
        refreshToken: "existing-refresh-token",
      },
      {
        now: 1_000_000,
        clientId: "client-id",
        clientSecret: "client-secret",
        fetcher,
      },
    );

    expect(result.refreshToken).toBe("existing-refresh-token");
    expect(result.error).toBeUndefined();
  });

  it("marks revoked consent as requiring sign-in without leaking Google errors", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        Response.json(
          { error: "invalid_grant", error_description: "sensitive details" },
          { status: 400 },
        ),
      );
    const token = {
      accessToken: "expired-token",
      accessTokenExpiresAt: 900_000,
      refreshToken: "revoked-refresh-token",
    };

    await expect(
      refreshGoogleAccessToken(token, {
        now: 1_000_000,
        clientId: "client-id",
        clientSecret: "client-secret",
        fetcher,
      }),
    ).resolves.toEqual({ ...token, error: "RefreshTokenError" });
  });

  it("requires sign-in when refresh credentials are unavailable", async () => {
    await expect(
      refreshGoogleAccessToken(
        { accessToken: "expired-token", accessTokenExpiresAt: 900_000 },
        { now: 1_000_000 },
      ),
    ).resolves.toMatchObject({ error: "RefreshTokenError" });
  });
});
