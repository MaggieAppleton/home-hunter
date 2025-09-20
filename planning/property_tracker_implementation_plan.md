South London Property Tracker — Implementation Plan

Updated: September 20, 2025 12:16P

Purpose

- Translate the technical spec into small, incremental tasks (each suitable for a single commit), grouped into phases. Each task has a stable ID for tracking in commit messages and in this checklist.

Working agreements

- Keep tasks small; one meaningful change per commit.
- After each task is done, we will propose a short descriptive commit message (don’t commit until you’ve reviewed/approved).
- Mark tasks complete here after we merge the corresponding commit.

Legend

- [ ] not started | [x] done | [~] in progress

Assumptions

- Local, single-user app; data stored in SQLite on disk under `data/`.
- Images are stored under `data/images/` and served by the server.
- Frontend uses React + TypeScript + Vite; server uses Node.js + Express + better-sqlite3.

Phase 0 — Project setup and scaffolding

- [x] [P0-01] Create repo structure `client/`, `server/`, `data/`, `planning/`
- [x] [P0-02] Initialize client with Vite (React + TS); add base `App.tsx`
- [x] [P0-03] Add Tailwind CSS to client (config + base styles)
- [x] [P0-04] Initialize server (Express + TS) with basic health route
- [x] [P0-05] Add better-sqlite3, CORS, and server scripts (dev/build)
- [x] [P0-06] Add root scripts to run client and server concurrently
- [x] [P0-07] Create `data/` and `data/images/` directories
- [x] [P0-08] Add ESLint/Prettier configs consistent across client/server
- [x] [P0-09] Add shared TypeScript types (client `types/property.ts`)
- [x] [P0-10] Add README with local dev instructions

Phase 1 — Core functionality

Database and backend

- [x] [P1-01] Implement SQLite connection (`server/src/database/connection.ts`)
- [x] [P1-02] Add migrations framework and script (`server/src/database/migrations/`)
- [x] [P1-03] Create `properties` table migration (per spec)
- [x] [P1-04] Create `property_images` table migration (per spec)
- [x] [P1-05] Seed script to insert one example property
- [x] [P1-06] CRUD routes: `GET /api/properties` (list)
- [x] [P1-07] CRUD routes: `GET /api/properties/:id` (single)
- [x] [P1-08] CRUD routes: `POST /api/properties` (create)
- [x] [P1-09] CRUD routes: `PUT /api/properties/:id` (update)
- [x] [P1-10] CRUD routes: `DELETE /api/properties/:id` (delete)

Frontend basics

- [x] [P1-11] API utility (`client/src/utils/api.ts`) with base client
- [x] [P1-12] Types (`client/src/types/property.ts`) aligned to spec
- [x] [P1-13] `useProperties` hook (list + refetch)
- [x] [P1-14] Minimal `PropertyTable.tsx` (name, price, status)
- [x] [P1-15] Install Leaflet; baseline `PropertyMap.tsx` with OSM tiles
- [x] [P1-16] Basic property markers from API positions (no clustering yet)
- [x] [P1-17] `MarkerPopup.tsx` skeleton (key info; no images yet)
- [x] [P1-18] `PropertyForm.tsx` (create/edit core fields, no images)
- [x] [P1-19] Simple navigation/layout (`Header`, `Navigation`)

Phase 2 — Enhanced features

Images

- [x] [P2-01] Endpoint: `POST /api/properties/:id/images` (upload via multipart)
- [x] [P2-02] Endpoint: `GET /api/images/:filename` (serve image)
- [x] [P2-03] Endpoint: `DELETE /api/images/:id` (delete)
- [x] [P2-04] Endpoint: `PUT /api/images/:id/cover` (set cover)
- [x] [P2-05] Client `ImageUpload.tsx` (multi-upload, mark cover)
- [x] [P2-06] Show cover image in marker popup

Filtering, sorting, search, export

- [ ] [P2-07] `TableFilters.tsx` with status, price, bedrooms filters
- [ ] [P2-08] Column sorting on all displayed fields
- [ ] [P2-09] Text search across name/address/notes
- [ ] [P2-10] CSV export of filtered view
- [ ] [P2-11] Price/number formatting utils (`utils/formatting.ts`)

Train stations & map enhancements

- [ ] [P2-12] Load static dataset of South London train/Tube/Overground stations
- [ ] [P2-13] Render station markers; toggle visibility
- [ ] [P2-14] Compute distance/walking time to nearest station
- [ ] [P2-15] Filter by max travel time to central London
- [ ] [P2-16] Marker color by status (gray/orange/blue/green/red)
- [ ] [P2-17] Marker clustering for properties when zoomed out

Data management

- [ ] [P2-18] `GET /api/export` JSON export of all data
- [ ] [P2-19] `POST /api/import` JSON import of full dataset

Migration from Airtable

- [ ] [P2-20] Import script: map CSV export -> SQLite schema
- [ ] [P2-21] Optionally geocode missing GPS coordinates (configurable provider)
- [ ] [P2-22] Preserve/import image references where available

Phase 3 — Polish and robustness

UX & responsiveness

- [ ] [P3-01] Responsive layout across breakpoints
- [ ] [P3-02] Inline table editing for quick updates
- [ ] [P3-03] Accessible focus states and keyboard navigation

Validation & errors

- [ ] [P3-04] Form validation (required fields, price formatting, coordinates)
- [ ] [P3-05] API error handling with user-friendly toasts

Map & performance

- [ ] [P3-06] Fit-to-bounds and selection syncing (table <-> map)
- [ ] [P3-07] Performance pass: memoization, list virtualization if needed

Docs & DX

- [ ] [P3-08] Update README with data backup/restore, import instructions
- [ ] [P3-09] Example dataset and screenshots in README

Task-to-commit guidance

- Use the task IDs in commit messages, e.g. "P1-14: Add minimal PropertyTable with name/price/status".
- Prefer one task per commit. If a change spans multiple tasks, split into sequential commits.

Next task recommendation

- Start with [P0-01] to [P0-04] to get the skeleton running (client + server + health check), then wire up DB migrations ([P1-01] to [P1-04]).
