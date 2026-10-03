# Development workflow

## Change flow

1. Start from a GitHub issue for non-trivial product work.
2. Read product/design/architecture context and the relevant local skill.
3. Create a focused branch such as `feat/issue-12` or `fix/issue-18`.
4. Implement the smallest coherent change.
5. Add or update tests and documentation with the code.
6. Run `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`.
7. Use Conventional Commits.
8. Open a PR describing behavior, architecture impact and validation.

Never merge to `main` merely because implementation is complete; merge is a maintainer decision.

## Documentation

- Product contract: `PRODUCT.md`.
- UX/design contract: `DESIGN.md`.
- Technical boundaries: `docs/architecture.md`.
- Google setup: `docs/google-setup.md`.
- Deployment: `docs/deployment.md`.

Keep these documents aligned with behavior; stale documentation is a bug.
