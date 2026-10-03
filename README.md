# FolioWiki

**Turn your Google Drive into an open-source wiki.**

FolioWiki keeps Google Drive as the source of truth and adds the missing knowledge layer: clean navigation, document rendering, search and permission-aware access — without migrating your docs into another platform.

## Why
Teams already write in Google Docs. FolioWiki takes the opposite approach from traditional wikis: keep writing where you already write, and publish that structure as a wiki.

## V1
Google OAuth · Drive folder as wiki root · folder/document navigation · Google Docs → internal AST → wiki renderer · permission-aware access · search contract · Edit in Google Docs · Docker deployment · provider architecture.

## Getting started
```bash
cp .env.example .env
npm install
npm run dev
```

Configure Google using [docs/google-setup.md](docs/google-setup.md). Read [AGENTS.md](AGENTS.md), [PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md) and [docs/architecture.md](docs/architecture.md) before substantial changes.
