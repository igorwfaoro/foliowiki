# Architecture

FolioWiki is a modular Next.js application with a provider boundary around external knowledge sources.

## Core flow

```
Google Drive / Docs
       ↓
GoogleDriveProvider
       ↓
KnowledgeProvider contract
       ↓
WikiTree + WikiDocument AST
       ↓
Application services
       ↓
Next.js UI / API
```

The core never consumes Google API response types. This keeps the renderer, navigation and search contracts portable.

## KnowledgeProvider

```ts
interface KnowledgeProvider {
  getTree(context: AccessContext): Promise<WikiTree>;
  getDocument(id: string, context: AccessContext): Promise<WikiDocument>;
  search(query: string, context: AccessContext): Promise<SearchResult[]>;
  canAccess(id: string, context: AccessContext): Promise<boolean>;
}
```

The first adapter is Google Drive. Future adapters can implement the same contract.

## Document AST

Google Docs structured content is normalized before rendering. Initial nodes: heading, paragraph, list, quote, code block, table, image and divider. Unsupported structures degrade gracefully rather than leaking provider data into the UI.

## Permissions

Google Drive is authoritative. Authenticated requests use the user's Google identity. Public content may be served anonymously only after the provider establishes that the source is public. Cache keys must not allow one user's private content to be served to another.

## Persistence and cache

V1 has no required database. Runtime configuration comes from environment variables and provider configuration. Cache is optional and abstracted; memory is acceptable locally, while Cloudflare KV or Redis can be added later.

## Deployment

The reference runtime is standard Next.js/Node and Docker. Cloudflare deployment is an optional adapter/target and must not force Cloudflare-specific primitives into the core.
