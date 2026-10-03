# Deployment

## Docker

Copy `.env.example` to `.env`, configure OAuth, then run:

```bash
docker compose up --build
```

The image uses Next.js standalone output.

## Node

```bash
npm install
npm run build
npm start
```

## Cloudflare Workers

The Next.js app can be built for Cloudflare Workers with the OpenNext adapter. The Worker is targeted at the dedicated FolioWiki Cloudflare account in `wrangler.jsonc`; keep Google Drive and authentication logic independent from Cloudflare bindings.

Preview the production build in the Workers runtime:

```bash
npm run preview:cloudflare
```

Deploy it:

```bash
npm run deploy:cloudflare
```

Before the first production deploy:

1. Set `AUTH_SECRET`, `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` as Worker secrets in the Cloudflare dashboard. Keep them out of source control and build logs.
2. Configure the Google OAuth client's authorized redirect URI as `https://<worker-host>/api/auth/callback/google` after the `workers.dev` hostname is assigned.
3. Add any Google accounts allowed by the OAuth consent screen while the Google project is in testing.

`GOOGLE_DRIVE_ROOT_FOLDER_ID` is optional; users can select a Drive folder during onboarding. `AUTH_TRUST_HOST` is configured for the Worker in `wrangler.jsonc`. The deploy command preserves dashboard-managed variables and secrets.
