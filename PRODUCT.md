# FolioWiki — Product

FolioWiki turns a folder in Google Drive into a clean, navigable, open-source wiki without migrating or duplicating the source documents.

## Product promise

**Your Drive is the source of truth. FolioWiki is the knowledge layer.**

Users keep writing in Google Docs. FolioWiki provides structure, navigation, search, presentation and, later, agent-friendly access.

## V1 user journey

1. Sign in with Google.
2. Choose a Drive folder as the wiki root.
3. FolioWiki maps supported folders and Google Docs into a tree.
4. Browse documents in a wiki shell with sidebar and breadcrumbs.
5. Open the original document in Google Docs when editing is needed.
6. Access is never broader than the source permissions allow.

## V1 scope

- Google authentication.
- Google Drive as the first KnowledgeProvider.
- Folder/document tree.
- Google Docs content mapped to an internal document model.
- Wiki renderer.
- Search contract.
- Public/private access model based on Drive permissions.
- Edit-in-Google-Docs links.
- Docker-first self-hosting.
- Portable architecture for future providers and Cloudflare deployment.

## Explicit non-goals

- Rich-text editor.
- Copying documents into a FolioWiki database.
- Reimplementing Google Drive ACLs.
- CRM-like users/roles.
- Collaboration features already provided by Google Docs.
- SaaS billing or multi-tenant complexity in V1.

## Future

Additional providers (OneDrive, Dropbox, GitHub/filesystem), MCP tools for agents, persistent search indexes, change notifications and optional SaaS hosting can be added without changing the core document contract.
