const REFRESH_WINDOW_MS = 60_000;
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

export interface GoogleTokenState {
  accessToken?: string;
  accessTokenExpiresAt?: number;
  refreshToken?: string;
  error?: "RefreshTokenError";
}

interface RefreshOptions {
  clientId?: string;
  clientSecret?: string;
  now?: number;
  fetcher?: typeof fetch;
}

export async function refreshGoogleAccessToken<T extends GoogleTokenState>(
  token: T,
  options: RefreshOptions = {},
): Promise<T & GoogleTokenState> {
  const now = options.now ?? Date.now();

  if (token.error === "RefreshTokenError" || !token.accessToken) {
    return token;
  }
  if (
    token.accessTokenExpiresAt &&
    token.accessTokenExpiresAt > now + REFRESH_WINDOW_MS
  ) {
    return token;
  }

  const clientId = options.clientId ?? process.env.GOOGLE_CLIENT_ID;
  const clientSecret = options.clientSecret ?? process.env.GOOGLE_CLIENT_SECRET;
  if (!token.refreshToken || !clientId || !clientSecret) {
    return { ...token, error: "RefreshTokenError" };
  }

  try {
    const response = await (options.fetcher ?? fetch)(GOOGLE_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return { ...token, error: "RefreshTokenError" };
    }

    const payload: unknown = await response.json();
    if (!isRefreshResponse(payload)) {
      return { ...token, error: "RefreshTokenError" };
    }

    const {
      access_token: accessToken,
      expires_in: expiresIn,
      refresh_token: refreshToken,
    } = payload;
    return {
      ...token,
      accessToken,
      accessTokenExpiresAt: now + expiresIn * 1000,
      refreshToken: refreshToken ?? token.refreshToken,
      error: undefined,
    };
  } catch {
    return { ...token, error: "RefreshTokenError" };
  }
}

function isRefreshResponse(value: unknown): value is {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
} {
  if (!value || typeof value !== "object") return false;

  const response = value as Record<string, unknown>;
  return (
    typeof response.access_token === "string" &&
    typeof response.expires_in === "number" &&
    response.expires_in > 0 &&
    (response.refresh_token === undefined ||
      typeof response.refresh_token === "string")
  );
}
