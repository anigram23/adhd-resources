# AGENTS.md

Full-stack ADHD resources directory: Spring Boot 4 API (`backend/`) + React 19 SPA (`frontend/`).
Read `CLAUDE.md` for architecture, entity hierarchy, package layout, and auth flow — not repeated here.

## Commands

Backend (run from `backend/`, use the wrapper):
- `./mvnw spring-boot:run` — dev server on `:8080` (API base path is `/api`)
- `./mvnw test -Dtest=ClassName` — single test class
- `./mvnw test` — all tests (currently only a `contextLoads()` smoke test exists)

Frontend (run from `frontend/`):
- `npm run dev` — Vite dev server on `:5173`
- `npm run build` — **runs `tsc -b` first**, so it fails on any type error; use it to typecheck
- `npm run lint` — eslint

There is no CI, pre-commit hook, or formatter config. Verify manually with the commands above.

## Setup gotchas

- **Configuration is env-vars only.** `backend/src/main/resources/application.properties` reads every value from an env var; the backend will fail to start (`PlaceholderResolutionException`) if any of `JWT_SECRET`, `JWT_EXPIRATION`, `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` is unset. `DDL_AUTO` defaults to `update`. Use a `.env`, direnv, or your shell to export these before `./mvnw spring-boot:run`.
- **No profile-specific properties files exist.** `application-dev.properties`, `application-local.properties`, `application-prod.properties` were removed. There is no `dev`/`local` profile activation, so adding any back will not be auto-loaded — point to it via `spring.config.import` or env-driven profile if reintroduced.
- Requires a running **PostgreSQL** matching `DB_URL`. The previous default was `jdbc:postgresql://localhost:5432/adhdresources_dev` with the `postgres` user. No Docker/compose provided; the DB must exist before `spring-boot:run`.
- `ddl-auto` defaults to `update` — Hibernate manages the schema; there are no migration tools. Seed data for states/cities lives in `backend/src/main/resources/sql_scripts/` and must be run manually against the DB.
- **`server.servlet.context-path=/api` in `application.properties` is what the frontend assumes.** If it is ever dropped, `frontend/src/api_service/httpClient.ts` (base `http://localhost:8080/api`) will 404 on every call — SecurityConfig path matching still works, but the browser can no longer reach the controllers.

## Conventions

- Backend is **feature-based**: each feature package holds Entity, Repository, Service, Controller, Mapper, and a `dto/` folder. Follow this layout when adding features.
- DTO mapping uses **MapStruct** — update the feature's Mapper whenever you add/change DTO or entity fields, or mapping silently drops them.
- `SecurityConfig` `requestMatchers` paths are written **without the `/api` prefix** (context-path is stripped before matching). Match this when adding routes; unmatched paths fall through to `anyRequest().permitAll()`.
- Frontend API calls go only through `api_service/*` files backed by `httpClient.ts` (Axios, `withCredentials: true`). Add a function there rather than calling Axios inline.
- Auth is a JWT in an HTTP-only `jwt` cookie; frontend hydrates via `/auth/me` in `AuthContext`. Do not add token-in-header logic.
- Path alias `@/` maps to `frontend/src/`.

## Repo state

- Two remotes: `origin` (GitHub), `codeberg`. `main` tracks `codeberg/main`.
- Known dead/rough edges (do not treat as bugs to auto-fix unless asked): admin `register` endpoint is commented out; `AdminHome` links to an undefined `/admin/reviews` route; `SecurityConfig` matches `/me` but the real path is `/auth/me`.
