# Google setup

FolioWiki needs a Google OAuth client and access to Google Drive/Docs APIs.

1. Create or choose a Google Cloud project.
2. Configure the OAuth consent screen.
3. Enable Google Drive API and Google Docs API.
4. Create a Web OAuth client.
5. Configure the local callback URL used by Auth.js.
6. Copy client ID and secret to `.env` using `.env.example` as the template.

Request only the scopes required by the implemented feature. Do not commit credentials. Public distributions may require Google's OAuth verification depending on the scopes and audience.
