# ADHD Resources

A crowdsourced directory of psychologists and psychiatrists in India. Visitors can look up professionals by city and type, read community-written reviews, learn about ADHD and the diagnostic process, and — once registered as a reviewer — contribute reviews of their own.

## Features

### For everyone (no login required)

- **Find a professional** — pick a professional type (psychologist, psychiatrist, etc.) and a city; the directory shows everyone matching that combination in the database.
- **Read reviews** — each professional's page lists community reviews with a star rating, average score, contact details, practice address, online-consultation availability, per-consultation fee, diagnosis fee, and the full review text.
- **Search by name** — look up a professional directly by name and jump straight to their reviews page.
- **Browse informational pages** — static pages ("What is ADHD?", "How do I get diagnosed?", etc.) are surfaced on the home page and indexed by slug.
- **Prompted to log in to contribute** — attempting to add a review surfaces a login-or-register dialog instead of silently failing.

### For reviewers (registered users)

- **Register / log in** with email and password.
- **Add a review** for an existing professional, or for a new one (city + professional type + name).
- **Edit or delete** your own reviews from the professional's reviews page.
- **Report a review** that is factually wrong or inappropriate; the report becomes a ticket visible to admins.
- **My tickets** — see the tickets you have raised and their status.
- **My reviews** — a personal list of every review you have written.
- **Profile** — manage your account details.

### For admins

- Manage **static pages** (page → section → section-block content tree).
- Manage **professional types** and **ticket types** (categories for tickets).
- View **all tickets** submitted by reviewers.
- View **all reviews** and moderate them.
- Separate admin login at `/admin/login`.

## Tech stack

### Backend — `backend/`

- **Spring Boot 4** on **Java 21**, built with **Maven** (`./mvnw`).
- **PostgreSQL** for persistence (Hibernate `ddl-auto=update`, no migration tools).
- **JWT-based authentication** stored in an HTTP-only cookie.
- **MapStruct** for entity ↔ DTO mapping.
- **Feature-based package layout**: each feature (`staticPage`, `professional`, `review`, `ticket`, `reviewer`, `admin`, …) keeps its entity, repository, service, controller, mapper, and a `dto/` folder together. Shared concerns live under `core/security/`.
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