# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (type-checks first)
- `npm run lint` — ESLint
- `npm run preview` — preview the production build
- `npm test` — Vitest in watch mode (`npx vitest run` for a single run)

Testing: Vitest is configured in the `test` key of `vite.config.ts` (imports `defineConfig` from `vitest/config`; environment `jsdom`; picks up `src/**/*.test.{ts,tsx}`; no globals, so import `describe`/`it`/`expect` from `vitest`). Tests are co-located with the code (e.g. `dashboard/utils/formatDuration.test.ts`, `timelineMappers.test.ts`) and currently cover only pure helpers; use them as the template for new tests. Testing Library is installed, but there is no `setupFiles` for `@testing-library/jest-dom` yet — add it when the first component test needs it.

## Stack

React 19 + TypeScript + Vite, Tailwind CSS v4 (via `@tailwindcss/vite`), shadcn/ui (style `base-nova`, built on `@base-ui/react`; components live in `src/components/ui`, add more with the `shadcn` CLI per `components.json`), react-router-dom v7, zustand for state, react-hook-form + zod (`@hookform/resolvers`) for forms. `@tanstack/react-query` handles server state (so far only babies; see `src/api/`). Import alias: `@` → `src`.

## Architecture

A baby-tracking ("parents") app talking to a backend API (`VITE_API_URL`, see `.env.example`; copy it to `.env.local` and restart the dev server). The migration to the API is phased (plan in `babyfeatureplan.md`): babies come from the API, while feeding/diaper/sleep/weight entries still live in in-memory zustand stores and are lost on reload until Phases 3–5 land.

- `src/app/` — entry wiring. `App.tsx` wraps the router in `QueryClientProvider` (`queryClient.ts`: `staleTime` 30 s, `retry` 1). `router.tsx` defines the `createBrowserRouter` routes inside the `AppShell` layout: `/` redirects to `/babies`, `/babies` is the tiles page, `/babies/:babyId` renders the (still baby-agnostic) dashboard. `/feeding` is outside the shell. The URL is the source of truth for the selected baby.
- `src/api/` — the only code that knows about HTTP. `types.ts` holds hand-written DTOs mirroring the backend's OpenAPI contract (update it when the contract changes), `client.ts` has `request<T>(path, {method, body, query})` (base URL from `import.meta.env.VITE_API_URL`; throws `ApiError` with the parsed problem details on non-2xx), and `babies.ts` has `getBabies()` and `createBaby()`. Functions here map DTOs to domain types (e.g. `BabyResponse` → `Baby`, `null` name → `""`). `createBaby` sends a random GUID `userId`, generated once per browser and kept in `localStorage`, because there is no auth yet.
- `src/features/` — feature folders. Each logged-activity feature (`feeding`, `diaper`, `sleep`, `weight`) follows the same pattern:
  - `schema.ts` — zod form schema
  - `types.ts` — domain type (timestamps stored as UTC ISO strings)
  - `store.ts` — zustand store holding the list and an add action (`addFeeding`, `addDiaper`, `addSleep`, `addWeight`)
  - `components/Add<X>Dialog.tsx` wrapping a react-hook-form form (`FeedingForm.tsx`, `DiaperForm.tsx`, `SleepForm.tsx`, `WeightForm.tsx`)
  - Imports use the `@/features/<x>/...` alias with explicit `.ts`/`.tsx` extensions.
- `src/lib/dateTime.ts` — shared time-zone helpers. **All forms with date/time inputs must use them:** `getLocalDateTimeDefaults(now?)` gives local `{date, time}` defaults for `<input type="date|time">` (compute it once per form render, not per field), and `toUtcIsoTimestamp(date, time)` converts the typed local values to a UTC ISO string for storage. Display converts back to local (e.g. `toLocaleTimeString`).
- `src/features/baby/` — baby profile. `Baby` = `{id, name, dateOfBirth}` (`id` from `crypto.randomUUID()`; `dateOfBirth` is a local calendar date `YYYY-MM-DD`, not a UTC timestamp, since a birth date has no time zone). The list is server state: `hooks/useBabies.ts` (`useQuery`, key `["babies"]`) and `hooks/useCreateBaby.ts` (`useMutation`, invalidates `["babies"]`). `schema.ts` (`babyFormSchema`: name required, date of birth required and not in the future; tested in `schema.test.ts`). `components/`: `BabyForm` + `AddBabyDialog` (same pattern as the weight form/dialog), `BabyTile` (card linking to `/babies/:id`, shows `formatAge`). `pages/BabiesPage.tsx` shows loading/error/empty states, the tiles and a dashed "Add baby" tile. `utils/formatAge(dateOfBirth, now?)` is a pure helper returning e.g. `14 days old` (tested in `formatAge.test.ts`). Temporary leftover until Phase 2: `store.ts` (`useBabyStore`, seeded with "Emma") still feeds `BabyHeader` (`babies[0]`), so every tile currently opens a dashboard showing Emma.
- `src/features/sleep/` — sleep tracking. `Sleep` = `{id, description?, startTimestamp, endTimestamp}`. The form has separate start date/time and end date/time (so overnight sleep works); both default to now. `schema.ts` uses a zod `.refine` so end must be after start (error shown on `endTime`). Duration is derived, never stored.
- `src/features/weight/` — weight tracking. `Weight` = `{id, weightKg, timestamp}`. The form has only a kg input (`step="0.01"`, registered with `valueAsNumber: true` so `schema.ts` can use `z.number()` positive) and a date input defaulting to today. There is no time input: `WeightForm` combines the chosen date with the current local time of day on submit (via `getLocalDateTimeDefaults().time` + `toUtcIsoTimestamp`), because the timeline sorts by timestamp.
- `src/features/dashboard/` — dashboard page and its components.
  - `QuickActions.tsx` owns the open/close state of each Add dialog (Feeding, Diaper, Sleep, Weight) and passes the submitted entry to the matching feature store.
  - `TodayTimeline.tsx` only renders: it calls `hooks/useTimelineEvents.ts`, which reads the feeding, diaper, sleep and weight stores, maps each entry to a `TimeLineEvent` (`types.ts`) with the pure mappers, merges and sorts newest first (memoized), and `TimeLineItem` renders each event (icon per event type). Sleep events are placed at `startTimestamp`, with the duration as description; weight events show `<n> kg`. It does not yet filter to today (the hook is the place to add that).
  - `utils/` holds pure helpers: `formatTimestamp` (local HH:MM), `formatDuration(start, end)` (e.g. `2 h 15 min`), and `timelineMappers.ts` (`feedingToEvent`, `diaperToEvent`, `sleepToEvent`, `weightToEvent`, `sortEventsNewestFirst`). Mappers live in the dashboard, not in the features, so features stay unaware of the timeline.
  - `DashboardPage` still renders `DailySummary` from `mockData.ts`; wiring the stores into it (including the sleep total and the latest weight) is the pending integration point.
  - `BabyHeader.tsx` shows the baby's name and age from `useBabyStore` (to be replaced by an API fetch in Phase 2).
- `src/components/layout/AppShell.tsx` — page shell; the header title links to `/babies`.
- `src/stores/appStore.ts` — global app state (`selectedBabyId`, not used; the URL decides the selected baby).

## Known issues

- Python is not installed in the dev environment; use node or the Edit tool for scripted edits.
- Without `VITE_API_URL` set, `request()` throws "Invalid URL" before any network call, so `/babies` shows its error state and nothing appears in the network tab. Create `.env.local` from `.env.example` and restart Vite.
- `npm run lint` currently reports one error in `components/ui/button.tsx` (react-refresh) and one warning in `FeedingForm.tsx` (`watch()` vs React Compiler); both predate the API work.
- `DiaperForm.tsx` still has a misspelled props interface, `DiaperFromProps`.

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


