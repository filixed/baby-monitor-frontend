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
- `src/feauters/` — feature folders (note the existing misspelling "feauters"; keep it for imports/consistency unless doing a rename). Each logged-activity feature (`feeding`, `diaper`) follows the same pattern:
  - `schema.ts` — zod form schema
  - `types.ts` — domain type
  - `store.ts` — zustand store holding the list and an add action
  - `components/Add<X>Dialog.tsx` wrapping `components/<X>From.tsx` (react-hook-form form; file names are misspelled `FeedingFrom`/`DiaperFrom`)
- `src/feauters/dashboard/` — dashboard page and its components. `QuickActions.tsx` owns the open/close state of each Add dialog and passes the submitted entry to the matching feature store. `DashboardPage` still renders summary/timeline from `mockData.ts` rather than from the feature stores; wiring the stores into `DailySummary`/`TodayTimeline` is the pending integration point. Sleep and Weight quick actions are placeholders with no handlers.
- `src/stores/appStore.ts` — global app state (`selectedBabyId`).

Inconsistency to be aware of: the diaper store action is named `AddDiaper` (capitalized) while the feeding store uses `addFeeding`.

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
