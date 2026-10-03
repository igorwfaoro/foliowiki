import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { refreshGoogleAccessToken } from "@/auth/token-refresh";

const scopes = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/documents.readonly",
].join(" ");

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/signin", error: "/signin" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: scopes,
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const expiresAt =
          account.expires_at ??
          (account.expires_in
            ? Math.floor(Date.now() / 1000) + account.expires_in
            : undefined);
        token.accessToken = account.access_token ?? undefined;
        token.accessTokenExpiresAt = expiresAt ? expiresAt * 1000 : undefined;
        token.refreshToken = account.refresh_token ?? token.refreshToken;
        delete token.error;
        return token;
      }

      return refreshGoogleAccessToken(token);
    },
    session({ session, token }) {
      if (token.error === "RefreshTokenError") {
        session.error = "RefreshTokenError";
      }
      return session;
    },
  },
});
