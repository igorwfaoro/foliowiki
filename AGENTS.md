# FolioWiki

Open-source knowledge layer over Google Drive. Code and internal contracts are English; user-facing copy should be easy to localize.

## Before changing the product

Read `PRODUCT.md`, `DESIGN.md`, `docs/architecture.md` and `docs/development-workflow.md`. Product behavior must preserve the central invariant: **Google Drive remains the source of truth.**

## Local skills

- `fw-dev-flow`: use for every product change; understand the issue, architecture impact, implementation, tests and documentation before finishing.
- `fw-knowledge-provider`: use whenever changing Drive integration, document parsing, permissions, search or adding another content source.
- `fw-ux-product`: use for user-facing flows and components; preserve the editorial, content-first design.
- `fw-commit-push`: use before committing/pushing; validates docs, formatting, lint, types, tests and build.

## Architecture rules

- UI never calls Google APIs directly. Provider adapters own external API details.
- Core knowledge contracts must not depend on Google, Next.js or persistence-specific types.
- `KnowledgeProvider` is the boundary for trees, documents, search and access checks.
- Convert provider-native documents into FolioWiki's internal document AST before rendering.
- Never return OAuth tokens, Google API payloads or secrets to the client.
- Drive permissions are authoritative. FolioWiki must never broaden access.
- Route handlers/controllers remain thin; services orchestrate use cases.
- Validate external input with Zod at boundaries.
- Keep one clear concept per file; avoid generic god services and premature DI containers.
- Do not introduce a database until a concrete persistence requirement exists.
- Cache is an optimization and must remain replaceable through a small provider contract.
- No empty directories in the repository.

## Quality

Behavior changes need proportional tests. Before finishing run formatting check, lint, typecheck, tests and build. Update docs whenever architecture, auth, provider contracts, deployment or development workflow changes.

Never commit `.env`, OAuth credentials, refresh tokens or Drive content.
