# Authentication

FolioWiki uses Auth.js with Google OAuth. The server keeps the Google access token in the encrypted Auth.js JWT/session flow and uses it only server-side when calling provider adapters.

V1 requests read-only Drive and Docs scopes. UI code must never receive OAuth tokens. Drive remains authoritative for document access. A later public-page path must independently establish public source visibility rather than bypassing provider authorization.
