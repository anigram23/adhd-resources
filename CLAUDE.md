# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Crowdsourced directory of ADHD-relevant psychologists/psychiatrists in India. Spring Boot 4 REST API (`backend/`) + React 19 SPA (`frontend/`). Three audiences: anonymous visitors (browse professionals, reviews, static info pages), **REVIEWER** (registered users who write/edit reviews and raise tickets), **ADMIN** (manages static pages, professional/ticket types, tickets, reviews, reviewers).

## Commands

### Backend (run from `backend/`)
```bash
./mvnw spring-boot:run            # dev server on :8080, API under /api
./mvnw test                       # all tests
./mvnw test -Dtest=ClassName      # single test class
./mvnw package                    # build jar
```
`AdhdResourcesApplicationTests.contextLoads()` boots the full context, so it needs the env vars below and a reachable Postgres. `AdminBootstrapPropertiesTest` is the only other test.

### Frontend (run from `frontend/`)
```bash
npm run dev    # Vite dev server on :5173
npm run build  # tsc -b && vite build — fails on any type error, use it to typecheck
npm run lint   # eslint
```

### Full stack
`docker-compose.yaml` runs Postgres 18 (db `adhdresources_dev`), backend (:8080), and frontend via nginx (:5173 → 80). Reads `DB_*`, `JWT_*`, `VITE_API_URL` from the shell / `.env`. Note: compose defaults `DDL_AUTO` to `update` — override it to `validate` (see Flyway below).

No CI, pre-commit hooks, or formatter config.

## Configuration (env vars only)

`backend/src/main/resources/application.properties` is the only config file; there are no `application-{profile}.properties` files and no profile is active by default. Startup fails if any required var is unset.

- Required: `JWT_SECRET`, `JWT_EXPIRATION` (ms), `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `LOGGING_LEVEL_ROOT`.
- Optional: `DDL_AUTO` (default `validate` — keep it), `BOOTSTRAP_ADMIN_ENABLED` (default `false`).
- Admin bootstrap: when enabled, `AdminBootstrapRunner` creates admins from `bootstrap.admin.accounts[n]` on startup, bound via relaxed binding, e.g. `BOOTSTRAP_ADMIN_ACCOUNTS_0_EMAIL`, `..._0_PASSWORD`, `..._0_NAME` (optional, defaults to email local part), `..._0_SUPER` (default `true`; Lombok makes the `isSuper` field bind as `super`). Existing emails are skipped; missing email/password throws. There is no admin register endpoint (commented out), so this is how admins get created.
- Frontend API base URL comes from `VITE_API_URL` (`frontend/.env.development` = `http://localhost:8080/api`; a Docker build arg in prod). CORS allows only `http://localhost:5173` (`CorsConfig`).

## Architecture

### Backend

Spring Boot 4, Java 21, PostgreSQL, Lombok, MapStruct, jjwt. `server.servlet.context-path=/api`.

**Feature-based packages** under `io.github.anigaut.adhdresources`: each feature (`admin`, `reviewer`, `professional`, `professionalType`, `review`, `ticket`, `ticketType`, `staticPage`, `staticPageSection`, `city`, `state`) holds Entity, Repository, Service, Controller, Mapper, and `dto/` (Request/Response/Update DTOs). Shared code in `core/`: `security/` (`SecurityConfig`, `CorsConfig`, `jwt/JwtFilter`, `jwt/JwtUtil`, `auth/AuthController` exposing `/auth/me`), `exception/` (`GlobalExceptionHandler`, `HttpException`), `utils/` (`CookieUtil`, `Constants`).

**MapStruct**: update the feature's Mapper whenever DTO or entity fields change, or fields silently drop.

**Database / Flyway**: Flyway owns the schema (`backend/src/main/resources/db/migration/`, applied on startup); Hibernate only validates. Schema change = new `V<N>__description.sql`; never edit an applied migration; never set `DDL_AUTO=update`. States/cities are seeded by V2/V3. User-facing entities (`professional`, `review`, `reviewer`, `ticket`, `static_page`, `admin`) use UUID PKs; lookup/CMS tables use int sequences. Boot 4 gotcha: Flyway needs `org.springframework.boot:spring-boot-flyway` in addition to `flyway-core` + `flyway-database-postgresql`, otherwise migrations are silently skipped and validation fails with "missing table".

**Static content** (section blocks were merged into section content in V4):
```
StaticPage (UUID id, slug, title, active)
  └── StaticPageSection (int id, title, content TEXT, orderIndex)
```
`StaticPage` uses `@NamedEntityGraph("StaticPage.withSections")` to load sections in one query.

**Auth**: JWT in an HTTP-only `jwt` cookie, set by the `/admin/login` and `/reviewer/login` endpoints. `JwtFilter` validates it per request; frontend never handles the token. Authorization is entirely in `SecurityConfig` `requestMatchers` (no method security). Matchers are written **without** the `/api` prefix and are mostly per-HTTP-method (e.g. `GET /static-page/**` public, POST/PATCH/DELETE ADMIN). `/admin/**` and `/reviewer/**` are `permitAll` except specific overrides, and unmatched paths fall through to `anyRequest().permitAll()` — add an explicit matcher for every new protected route.

### Frontend

React 19, TypeScript, Vite, Chakra UI v3, TanStack React Query v5, React Router v7 (`createBrowserRouter`), Axios. Path alias `@/` → `src/`.

- `api_service/` — one file per backend resource; all calls go through `httpClient.ts` (Axios, `withCredentials: true`, response interceptor normalizes errors to `{ status, message }`). Add functions here rather than calling Axios inline.
- `auth/` — `AuthContext` fetches `/auth/me` via React Query on load; `useAuth()` exposes `{ user, isAuthenticated, isLoading, isError }`. `AuthGate` delays rendering until auth state resolves.
- `routing/Router.tsx` — route tree. Admin routes under `/admin/*` wrapped in `ProtectedRoute allowedRole="ADMIN"` (`routing/ProtectedRoutes.tsx`); reviewer/public routes at top level.
- `pages/` — one component per route; feature UI lives in `components/<feature>/`. Shared types in `utils/types.ts` (ids are string UUIDs).

## Repo notes

- Remotes: `origin` (GitHub) and `codeberg`.
- `AGENTS.md` duplicates parts of this file for other agents; keep the two consistent when changing setup facts.
- Known rough edges (don't auto-fix unless asked): `SecurityConfig` matches `/me` but the real path is `/auth/me` (works only via the `permitAll` fallthrough); `README.md` still describes `ddl-auto=update` and section blocks.
