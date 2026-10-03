# Google setup

FolioWiki needs a Google OAuth client and access to Google Drive/Docs APIs.

1. Create or choose a Google Cloud project.
2. Configure the OAuth consent screen and add the users who may sign in while the app is in testing.
3. Enable Google Drive API and Google Docs API.
4. Create a Web OAuth client.
5. Add the authorized redirect URI `http://localhost:3000/api/auth/callback/google` for local development. Add the corresponding HTTPS callback URI for each deployed host.
6. Copy client ID and secret to `.env` using `.env.example` as the template.

FolioWiki requests identity (`openid`, `email`, `profile`), Drive metadata read (`drive.metadata.readonly`) and Google Docs read (`documents.readonly`). It currently edits documents by opening them in Google Docs, not through the API. Do not add write scopes until a feature needs them.

Request only the scopes required by the implemented feature. Do not commit credentials. Public distributions may require Google's OAuth verification depending on the scopes and audience.
