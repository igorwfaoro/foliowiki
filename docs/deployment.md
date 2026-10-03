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

## Cloudflare

Cloudflare is a planned first-class deployment target, but the core must remain runtime-neutral. Keep provider and cache contracts independent from Workers-specific APIs. Add the Cloudflare adapter only with an executable deployment path and CI validation.
