# Authentication

FolioWiki uses Auth.js with Google OAuth and stateless, encrypted JWT sessions.
The session cookie is HTTP-only and lasts for 30 days. Signing out clears the
FolioWiki session; it does not revoke the user's Google account grant.

## Google permissions

The OAuth flow requests identity (`openid`, `email`, `profile`), read-only Drive
metadata (`drive.metadata.readonly`) and read-only Google Docs content
(`documents.readonly`). FolioWiki currently reads and displays documents; the
“Edit in Google Docs” action opens the source editor and does not write through
the Google API. Add a broader scope only alongside a feature that requires it.

## Token lifecycle and boundaries

Google access and refresh tokens are stored only in the encrypted, server-side
Auth.js JWT. The public session contains ordinary user profile data and a
non-sensitive refresh-error indicator, never either provider token. Route
handlers read the JWT on the server and refresh access tokens shortly before
expiration. A rotated refresh token replaces the previous token in the JWT.

The `/wiki` and `/onboarding` routes require a valid session. The v1 API routes
also require valid Google credentials before invoking the knowledge provider.
If Google rejects refresh credentials, protected pages redirect the user to
sign-in with a recoverable reconnection message. If Google rejects a provider
API request before the access token expires, that API responds with `401` and
code `reauthentication_required` as well.

Drive remains authoritative for document access. A future public-page path must
independently establish public source visibility rather than bypassing provider
authorization.
