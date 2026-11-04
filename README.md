# ADHD Resources

A crowdsourced directory of psychologists and psychiatrists in India. Visitors can look up professionals by city and type, read community-written reviews, learn about ADHD and the diagnostic process, and — once registered as a reviewer — contribute reviews of their own.

## Features

### For everyone (no login required)

- **Find a professional** — pick a professional type (psychologist, psychiatrist, etc.) and a city; the directory shows everyone matching that combination in the database.
- **Read reviews** — each professional's page lists community reviews with a star rating, average score, contact details, practice address, online-consultation availability, per-consultation fee, whether the reviewer was diagnosed by that professional (and the diagnosis fee if so), and the full review text.
- **Search by name** — look up a professional directly by name and jump straight to their reviews page.
- **Browse informational pages** — active static pages ("What is ADHD?", "How do I get diagnosed?", etc.) are surfaced on the home page and served by slug.
- **Prompted to log in to contribute** — attempting to add a review surfaces a login-or-register dialog instead of silently failing.

### For reviewers (registered users)

- **Register / log in** with email and password.
- **Add a review** for an existing professional, or for a new one (city + professional type + name). Contact numbers must be 10 digits; a diagnosis fee can only be entered when you tick that this professional diagnosed you.
- **Edit or delete** your own reviews from the professional's reviews page.
- **Report a review** that is factually wrong or inappropriate; the report becomes a ticket visible to admins.
- **My tickets** — see the tickets you have raised and their status.
- **My reviews** — a personal list of every review you have written.
- **Profile** — view your account details, change your password, or delete your account.

### For admins

- Manage **static pages** (page → ordered sections with title and content; pages can be toggled active/inactive).
- Manage **professional types** and **ticket types** (categories for tickets).
- View **all tickets** filtered by status, update a ticket's status, or delete open tickets.
- View **all reviews** filtered by review id, reviewer, professional, or date range, and delete them.
- View **all reviewers** and ban (delete) them.
- Separate admin login at `/admin/login`. Admin accounts are created on startup via the bootstrap env vars (there is no admin sign-up).

## Tech stack

### Backend — `backend/`

- **Spring Boot 4** on **Java 21**, built with **Maven** (`./mvnw`).
- **PostgreSQL** for persistence; schema managed by **Flyway** migrations (`src/main/resources/db/migration/`), Hibernate only validates.
- **JWT-based authentication** stored in an HTTP-only cookie.
- **MapStruct** for entity ↔ DTO mapping.
- **Feature-based package layout**: each feature (`staticPage`, `professional`, `review`, `ticket`, `reviewer`, `admin`, …) keeps its entity, repository, service, controller, mapper, and a `dto/` folder together. Shared concerns live under `core/` (`security/`, `exception/`, `utils/`).
- API base path: **`/api`**.

### Frontend — `frontend/`

- **React 19** with **TypeScript**, built and served by **Vite**.
- **Chakra UI v3** for components and styling.
- **TanStack React Query v5** for server-state caching and invalidation.
- **React Router v7** (data-router API) for client-side routing.
- **Axios** for HTTP, wrapped behind a shared `httpClient` (`withCredentials: true`) and per-resource files under `api_service/`.
- Auth state hydrated on load via a `/auth/me` call into an `AuthContext`; role-gated routes use a `ProtectedRoute` wrapper.
- Path alias **`@/` → `src/`**.
</content>
</invoke>

## Running locally

Configuration is env-vars only. Required: `JWT_SECRET`, `JWT_EXPIRATION` (ms), `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `LOGGING_LEVEL_ROOT`. Optional: `DDL_AUTO` (default `validate`), `BOOTSTRAP_ADMIN_ENABLED` plus `BOOTSTRAP_ADMIN_ACCOUNTS_0_EMAIL` / `..._0_PASSWORD` to create an admin.

- **Backend**: `cd backend && ./mvnw spring-boot:run` (needs a reachable Postgres; serves `http://localhost:8080/api`).
- **Frontend**: `cd frontend && npm install && npm run dev` (serves `http://localhost:5173`; API URL from `VITE_API_URL`).
- **Docker**: `docker compose up --build` runs Postgres 18, the backend, and the nginx-served frontend. Set `DDL_AUTO=validate`, since compose otherwise defaults it to `update`.
