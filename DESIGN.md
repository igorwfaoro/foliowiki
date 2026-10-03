# FolioWiki — Design

FolioWiki should feel like reading a well-made book, not operating a file manager.

## Principles

- Content is the hero.
- Navigation is quiet and predictable.
- Preserve the hierarchy users already created in Drive.
- Prefer typography and whitespace over decorative UI.
- Desktop: persistent tree sidebar and readable content column.
- Mobile: tree becomes a drawer; content remains first-class.
- Every interactive control must be keyboard reachable and visibly focused.
- Light and dark themes must preserve readable contrast.

## Visual language

Neutral surfaces, subtle borders, restrained shadows, generous whitespace and a serif-friendly editorial content area are preferred. Product chrome may use a modern sans-serif. Avoid dashboard cards where ordinary document structure is enough.

## Document page

A page contains breadcrumbs, title, optional metadata/actions, and the rendered document. “Edit in Google Docs” is an external action, not an editing mode.

## Anti-patterns

- Recreating Google Docs editing controls.
- Dense admin-dashboard aesthetics.
- Showing raw Drive IDs or API concepts to ordinary users.
- Inventing a second permission system.
- Excessive animation or visual chrome.
