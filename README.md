# ECGO Battery Swap Monitoring Dashboard

Mini take-home implementation for the ECGO Fullstack Developer assessment.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- PostgreSQL
- Zod
- `pg` for database access

## Rendering approach

The dashboard uses **Next.js Server Components by default** with page-local feature organization.

- Cabinet list data is fetched directly on the server from PostgreSQL.
- Search, status filter, sorting, and pagination are represented by URL query parameters.
- Cabinet detail data is fetched on the server with independent queries executed through `Promise.all`.
- No `useEffect`/client-side API fetching is used for the initial dashboard data.
- `app/error.tsx` is a Client Component only because Next.js error boundaries require client components.
- The Route Handlers remain available as API boundaries and reuse the same server-side query functions.

The pages use `dynamic = "force-dynamic"` so each request reads current data instead of relying on a cached static render.

## Setup

1. Create PostgreSQL database and run `db/schema.sql`.
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL`.
3. Install dependencies: `npm install`.
4. Seed data: `npm run seed`.
5. Run: `npm run dev`.

Seed creates 10 branches, 50 cabinets, 600 slots, and 20,000 swap transactions across 30 days.

## URL-driven list state

Examples:

```text
/?q=CB-001
/?status=ONLINE
/?sort=swaps_asc&page=2
/?q=Jakarta&status=OFFLINE&sort=swaps_desc&page=2
```

Because search and filters live in the URL, the current state survives refresh and can be shared as a link.

## Assumptions

- "Swap 24 jam terakhir" means a rolling 24-hour window from `NOW()`, not calendar-day midnight.
- OFFLINE cabinets still show the last known slot state; the assessment does not define a separate stale-slot state, so the last persisted state is shown.
- A null heartbeat is rendered as `-`.
- Slots are fixed at 12 per cabinet for this exercise.
- The list uses offset pagination because this assessment only seeds 50 cabinets and the list is an internal admin screen. Cursor pagination would be a better fit if the cabinet list itself became very large.

## Query decisions

The cabinet list uses one data query plus one count query. Swap counts for the last 24 hours are aggregated in PostgreSQL with a grouped subquery instead of loading transactions into JavaScript or running a query per cabinet.

The detail page uses four independent database queries in parallel: cabinet information, slot state, hourly swap aggregation, and the latest 20 transactions. The hourly chart is also aggregated in PostgreSQL.

The application does not perform an N+1 loop over cabinets or transactions.

## API

Two Route Handlers are included:

- `GET /api/cabinets`
- `GET /api/cabinets/:id/transactions`

Both validate inputs with Zod and return a consistent `{ data }` or `{ error }` response shape.

## Trade-offs / remaining improvements

Authentication and branch-level authorization are intentionally represented as application boundaries in this standalone take-home sample; a production version would integrate the team's real auth/session system and enforce branch permissions server-side.

For a larger fleet, I would consider cursor pagination, PostgreSQL trigram/full-text search for substring searches, and rollup/materialized data for high-volume swap metrics.

## AI usage

ChatGPT was used for concept review, code review, test-case and brainstorming.

## Project structure

Feature-specific code lives next to its route inside `app/`. Global reusable UI lives in `components/`, shared helper functions live in `helpers/`, and database configuration lives in `config/`.

- `app/cabinets/*` contains the cabinet list feature.
- `app/cabinets/[id]/*` contains the cabinet detail feature.
- `components/*` contains only reusable/global UI.
- `helpers/*` contains shared formatting and validation helpers.
- `config/*` contains application configuration.
- Page-specific server queries stay inside the corresponding page folder.

Because the dashboard is server-side by default, there are no page hooks unless a page later introduces client-only interaction.
