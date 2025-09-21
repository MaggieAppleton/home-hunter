South London Property Tracker — Implementation Plan

Updated: September 21, 2025 4:05P

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

- [x] [P2-07] `TableFilters.tsx` with status filters
- [x] [P2-08] Column sorting on all displayed fields
- [x] [P2-09] Text search across name/address/notes
- [x] [P2-10] CSV export of filtered view
- [x] [P2-11] Price/number formatting utils (`utils/formatting.ts`)

Train stations & map enhancements

- [x] [P2-12] Load static dataset of South London train/Tube/Overground stations
- [x] [P2-13] Render station markers; toggle visibility
- [x] [P2-14] Compute distance/walking time to nearest stations; add all stations within 1km of the property to the database as both distance and walking time
- [x] [P2-15] Add train track lines to map showing major routes (removed - data was incorrect)
- [x] [P2-16] Marker color by status (not contacted, contacted, viewing booked, viewed, rejected, sold)
- [x] [P2-17] Implement multi-type station visualization with multiple colored dots for stations serving multiple transport types

Phase 3 — Polish and robustness

UX & responsiveness

- [x] [P3-02] Inline table editing
- [x] [P3-03] Accessible focus states and keyboard navigation

Frontend image enhancements

- [x] [P3-09] Single cover image in property popup in map
- [x] [P3-10] Property detail modal with full image gallery and property info
- [ ] [P3-11] Add ALL property details to modal
- [ ] [P3-12] Make all property details in modal editable. Change the action button from save coordinates to just "save" and it saves any changed data to the database.
- [x] [P3-12] Table row image thumbnails with click-to-open modal
- [x] [P3-13] Image upload integration in PropertyForm (add/edit properties)

Notes (2025-09-21):

- Attempting to render an image carousel directly inside Leaflet popups caused the page to freeze. Two contributing factors:
  - Heavy React re-renders inside Leaflet's popup DOM lifecycle.
  - A property with an invalid longitude (way outside [-180, 180]) likely exacerbated map internals.
- Current mitigation:
  - Disable images inside popups for now; open full gallery via a dedicated React modal outside the map DOM.
  - Add strict coordinate validation in the map layer to avoid rendering invalid markers.
  - Memoize markers to reduce re-renders.
- When reintroducing images to popups, keep them lightweight (single thumbnail) and defer carousels to the separate modal.

Image Upload & Display Fixes (2025-09-21):

- Fixed SQLite boolean binding error in image upload endpoint (converted boolean to integer)
- Resolved property duplication issue caused by multiple cover images
- Enhanced property details modal with comprehensive property information and image gallery
- Added thumbnail column to property table with 60px images
- Fixed image preservation when editing properties in table
- Updated server endpoints to consistently include full images array in responses

Phase 4 — New Schema Frontend Updates

Database schema redesign completed (2025-09-21):

- [x] [P4-01] Remove 'features' field from database and frontend
- [x] [P4-02] Add firstListedDate and timeOnMarketMonths fields to database
- [x] [P4-03] Add nearbyStations array with automatic distance calculation
- [x] [P4-04] Add nearbySchools array (ready for future school data)
- [x] [P4-05] Implement automatic time-on-market calculation
- [x] [P4-06] Fix train station distance calculation to trigger on property create/update
- [x] [P4-07] Update TypeScript types to match new schema
- [x] [P4-08] Clean up data folder and replace migration system with fresh schema

Frontend updates for new schema:

- [x] [P4-09] Update PropertyForm.tsx to include firstListedDate field
- [x] [P4-10] Update PropertyTable.tsx to display firstListedDate and timeOnMarketMonths columns
- [x] [P4-11] Update PropertyDetailsModal.tsx to show nearby stations with distances and walking times
- [x] [P4-12] Update PropertyDetailsModal.tsx to show nearby schools section (empty state for now)
- [x] [P4-13] Update CSV export to include new fields (firstListedDate, timeOnMarketMonths, nearbyStations)
- [x] [P4-14] Update PropertyForm.tsx to handle timeOnMarketMonths as read-only calculated field
- [x] [P4-15] Add validation for firstListedDate format (YYYY-MM-DD)
- [x] [P4-16] Update property table sorting to include new date and numeric fields

Follow-ups (post-freeze stabilization)

- [ ] [P3-10A] Re-enable MapBounds and train station markers after validating multiple properties have good coordinates
- [ ] [P3-09A] Reintroduce lightweight popup image (single thumbnail) in map and open full gallery in modal that opens from the table
- [ ] [P3-09B] Keep carousel out of Leaflet popups; ensure modal uses React portal detached from map DOM
- [ ] [P1-XX] Add server-side validation to reject/clamp invalid lat/lng on create/update (done for validation; consider clamping as enhancement)

Validation & errors

- [ ] [P3-04] Form validation (required fields, price formatting, coordinates)
- [ ] [P3-05] API error handling with user-friendly toasts

Map & performance

- [ ] [P3-06] Fit-to-bounds and selection syncing (table <-> map)
- [ ] [P3-07] Performance pass: memoization, list virtualization if needed
