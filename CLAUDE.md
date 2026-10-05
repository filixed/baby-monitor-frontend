# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (type-checks first)
- `npm run lint` — ESLint
- `npm run preview` — preview the production build

Vitest, jsdom and Testing Library are installed as devDependencies, but there is no `test` script, no vitest config and no test files yet. To run tests you will need to add them (`npx vitest` works once a config exists).

## Stack

React 19 + TypeScript + Vite, Tailwind CSS v4 (via `@tailwindcss/vite`), shadcn/ui (style `base-nova`, built on `@base-ui/react`; components live in `src/components/ui`, add more with the `shadcn` CLI per `components.json`), react-router-dom v7, zustand for state, react-hook-form + zod (`@hookform/resolvers`) for forms. `@tanstack/react-query` is installed but not used yet. Import alias: `@` → `src`.

## Architecture

A baby-tracking ("parents") app. Currently frontend-only with no backend: data lives in in-memory zustand stores, so it is lost on reload.

- `src/app/` — entry wiring. `router.tsx` defines the `createBrowserRouter` routes (`/` dashboard inside `AppShell` layout; `/feeding` outside it).
- `src/feauters/` — feature folders (note the existing misspelling "feauters"; keep it for imports/consistency unless doing a rename). Each logged-activity feature (`feeding`, `diaper`, `sleep`, `weight`) follows the same pattern:
  - `schema.ts` — zod form schema
  - `types.ts` — domain type (timestamps stored as UTC ISO strings)
  - `store.ts` — zustand store holding the list and an add action (`addFeeding`, `addDiaper`, `addSleep`, `addWeight`)
  - `components/Add<X>Dialog.tsx` wrapping a react-hook-form form (`FeedingFrom`/`DiaperFrom` are misspelled; `sleep` and `weight` use the correct `SleepForm.tsx` / `WeightForm.tsx`)
  - Imports use the `@/feauters/<x>/...` alias with explicit `.ts`/`.tsx` extensions.
- `src/lib/dateTime.ts` — shared time-zone helpers. **All forms with date/time inputs must use them:** `getLocalDateTimeDefaults(now?)` gives local `{date, time}` defaults for `<input type="date|time">` (compute it once per form render, not per field), and `toUtcIsoTimestamp(date, time)` converts the typed local values to a UTC ISO string for storage. Display converts back to local (e.g. `toLocaleTimeString`).
- `src/feauters/sleep/` — sleep tracking. `Sleep` = `{id, description?, startTimestamp, endTimestamp}`. The form has separate start date/time and end date/time (so overnight sleep works); both default to now. `schema.ts` uses a zod `.refine` so end must be after start (error shown on `endTime`). Duration is derived, never stored.
- `src/feauters/weight/` — weight tracking. `Weight` = `{id, weightKg, timestamp}`. The form has only a kg input (`step="0.01"`, registered with `valueAsNumber: true` so `schema.ts` can use `z.number()` positive) and a date input defaulting to today. There is no time input: `WeightForm` combines the chosen date with the current local time of day on submit (via `getLocalDateTimeDefaults().time` + `toUtcIsoTimestamp`), because the timeline sorts by timestamp.
- `src/feauters/dashboard/` — dashboard page and its components.
  - `QuickActions.tsx` owns the open/close state of each Add dialog (Feeding, Diaper, Sleep, Weight) and passes the submitted entry to the matching feature store.
  - `TodayTimeline.tsx` only renders: it calls `hooks/useTimelineEvents.ts`, which reads the feeding, diaper, sleep and weight stores, maps each entry to a `TimeLineEvent` (`types.ts`) with the pure mappers, merges and sorts newest first (memoized), and `TimeLineItem` renders each event (icon per event type). Sleep events are placed at `startTimestamp`, with the duration as description; weight events show `<n> kg`. It does not yet filter to today (the hook is the place to add that).
  - `utils/` holds pure helpers: `formatTimestamp` (local HH:MM), `formatDuration(start, end)` (e.g. `2 h 15 min`), and `timelineMappers.ts` (`feedingToEvent`, `diaperToEvent`, `sleepToEvent`, `weightToEvent`, `sortEventsNewestFirst`). Mappers live in the dashboard, not in the features, so features stay unaware of the timeline.
  - `DashboardPage` still renders `DailySummary` from `mockData.ts`; wiring the stores into it (including the sleep total and the latest weight) is the pending integration point.
- `src/stores/appStore.ts` — global app state (`selectedBabyId`).

## Known issues

- `npx tsc -b` (and so `npm run build`) fails with TS5101: `baseUrl` is deprecated in `tsconfig.app.json`. Type-check meanwhile with `npx tsc -p tsconfig.app.json --noEmit --ignoreDeprecations 6.0`.
- Python is not installed in the dev environment; use node or the Edit tool for scripted edits.

## Coding principles

- **Consistency first.** Follow the existing feature-folder pattern (`schema` / `types` / `store` / `components`) for new features (e.g. sleep, weight). Don't introduce a new structure without explaining why the current one doesn't fit.
- **Separation of concerns.** Components render and handle UI events; stores hold state and actions; zod schemas validate input. Put calculations (daily totals, timeline sorting, etc.) in pure functions outside components so they are easy to test and reuse.
- **Single source of truth.** Derive values from store data instead of copying them into extra state.
- **Types.** No `any`. Infer form types from zod schemas (`z.infer`) instead of writing them twice.
- **Feature boundaries.** Feature-specific code stays in its feature folder; shared UI goes in `src/components`; only truly app-wide state goes in `src/stores`. A feature should not reach into another feature's internals.
- **Patterns only when they solve a real problem.** Use custom hooks for reusable stateful logic, composition over prop explosion, and an API/adapter layer once a backend exists. Apply DRY / KISS / YAGNI / SOLID pragmatically: don't add abstractions, generic helpers or layers "for the future" — wait until duplication actually appears (roughly 3 times).
- **Small, focused components.** Keep state as local as possible; lift it only as high as needed.
- **Accessibility.** Prefer shadcn/base-ui primitives; every input gets a label.
- **Scope.** Don't silently fix unrelated issues (misspellings, naming inconsistencies) while doing another task — mention them instead.

## Learning mode

This is a project for learning frontend development.

- After a non-trivial change, end with a short **Why** section (2–5 bullets): which pattern or principle was used, why it fits here, and the main trade-off or alternative. Name the concept so I can look it up.
- Skip it for trivial edits (typos, renames, small fixes).
- Be honest: if a choice is convention or personal preference rather than objectively better, say so. If you're unsure, say so. Don't call something "best practice" or "industry standard" without a concrete reason, and don't invent sources.
- If my request would lead to a worse design, point it out briefly before doing it.

# Git Rules
- NEVER execute, modify, or create a Git commit, branch, or push without presenting the summary to the user first.
- Always ask for explicit confirmation before running any git command.
- Do not attempt to bypass terminal restrictions via secondary scripts.

## Git Commit Guidelines
- Always use the **Conventional Commits** specification for all commit messages.
- Format: `<type>(<scope>): <description>` (scope is optional).
- Allowed types:
  - `feat`: A new feature
  - `fix`: A bug fix
  - `docs`: Documentation changes
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
  - `refactor`: A code change that neither fixes a bug nor adds a feature
  - `perf`: A code change that improves performance
  - `test`: Adding missing tests or correcting existing tests
  - `chore`: Changes to the build process or auxiliary tools and libraries
- Use lowercase for the description and write it in the imperative mood (e.g., "add logging" instead of "added logging").


