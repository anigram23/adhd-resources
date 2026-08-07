# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack ADHD resources directory app. Spring Boot 4 REST API (`backend/`) + React 19 SPA (`frontend/`). Two user roles: **ADMIN** (manages content) and **REVIEWER** (reviews professionals).

## Commands

### Backend (run from `backend/`)
```bash
./mvnw spring-boot:run   # start dev server on :8080
./mvnw test              # run all tests
./mvnw test -Dtest=ClassName  # run a single test class
./mvnw package           # build jar
```

### Frontend (run from `frontend/`)
```bash
npm run dev    # start Vite dev server on :5173
npm run build  # tsc + vite build
npm run lint   # eslint
```

## Architecture

### Backend

Spring Boot 4, Java 21, PostgreSQL. All configuration lives in `backend/src/main/resources/application.properties` and is sourced exclusively from environment variables — there are no per-profile `application-{dev,local,prod}.properties` files (the former files were removed). API server context path is `/api` (set in `application.properties`).

**Package structure** is feature-based under `io.github.anigaut.adhdresources`:
- Each feature (e.g. `staticPage`, `sectionBlock`, `admin`, `reviewer`) contains its entity, repository, service, controller, and a `dto/` subfolder.
- `core/security/` holds `SecurityConfig`, `CorsConfig`, `JwtFilter`, and `JwtUtil`.
- `core/security/auth/` holds `AuthController` with the `/auth/me` endpoint used by the frontend to hydrate auth state.

**Auth flow**: JWT stored in an HTTP-only cookie. `JwtFilter` extracts and validates the token on every request. `SecurityConfig` permits `/api/admin/login` and `/api/admin/logout` publicly; `/api/admin/**` requires `ROLE_ADMIN`, `/api/reviewer/**` requires `ROLE_REVIEWER`.

**Configuration (env-var only)**: `application.properties` reads every value from an env var and will fail to start if any required one is unset. Required: `JWT_SECRET`, `JWT_EXPIRATION` (ms), `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`. Optional: `DDL_AUTO` (defaults to `update`).

**Entity hierarchy for static content**:
```
StaticPage (slug, title)
  └── StaticPageSection (title, orderIndex)
        └── SectionBlock (content, orderIndex)
```
`StaticPage` uses a `@NamedEntityGraph("StaticPage.withSectionsAndBlocks")` to eagerly load the full tree in a single query.

**DTO mapping** uses MapStruct. Always update the mapper when adding fields to DTOs or entities.

**Profiles**: none are active by default. There is no `application-dev.properties`, `application-local.properties`, or `application-prod.properties`; profile-specific overrides must come from env vars (or via a `spring.config.import` / external config file added by the operator).

### Frontend

React 19, TypeScript, Vite, Chakra UI v3, TanStack React Query v5, React Router v7, Axios.

- `api_service/` — one file per backend resource (`auth.ts`, `admin.ts`, `reviewer.ts`, `staticPages.ts`). All HTTP calls go through `httpClient.ts` (Axios instance at `http://localhost:8080/api`, `withCredentials: true`).
- `auth/AuthContext.tsx` — calls `/auth/me` via React Query on app load; exposes `useAuth()` hook with `{ user, isAuthenticated, isLoading, isError }`.
- `auth/AuthGate.tsx` — wraps routes that need auth state to be resolved before rendering.
- `routing/Router.tsx` — defines the route tree. Admin routes live under `/admin/*`, reviewer routes at top level.
- `pages/` — one file per page; no nested routing within pages.
