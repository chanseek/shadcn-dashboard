# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # start dev server (Turbopack, default port 3000)
pnpm build    # production build
pnpm start    # run production build
pnpm lint     # eslint (eslint-config-next)
```

There is no test suite configured in this repo.

Package manager is pnpm (`pnpm-lock.yaml` is present) — don't use npm/yarn commands that would create a competing lockfile.

## Architecture

This is a shadcn/ui admin dashboard template built on Next.js 16 (App Router) + React 19 + Tailwind v4. It is a template/demo product (ShadcnStore), not a backend-connected app — all data is local mock data (`data.ts`/`data.tsx` files or inline arrays), and `src/middleware.ts` only handles a couple of legacy redirects (`/login` → `/auth/sign-in`, `/register` → `/auth/sign-up`).

### Route groups

- `src/app/(dashboard)/` — all authenticated-app pages (dashboard variants, mail, tasks, chat, calendar, users, settings, pricing, faqs). Shares `(dashboard)/layout.tsx`.
- `src/app/(auth)/` — sign-in/sign-up/forgot-password variants (each page has 2-3 numbered UI variants, e.g. `sign-in`, `sign-in-2`, `sign-in-3`) and error pages (`errors/forbidden`, `errors/not-found`, etc). Shares `(auth)/layout.tsx`.
- `src/app/landing/` — standalone marketing page, not under either route group, composed from `landing/components/*-section.tsx` sections.

Each feature route follows the same local structure: `page.tsx` + a `components/` subfolder for page-specific components, and sometimes `data.ts`/`schemas/` for mock data and zod/type schemas. Keep new page-specific components colocated the same way rather than pushing them into `src/components`.

### Dashboard shell composition

`(dashboard)/layout.tsx` wires together `AppSidebar`, `SiteHeader`, `SiteFooter`, `SidebarProvider`/`SidebarInset` (from `components/ui/sidebar.tsx`, the shadcn sidebar primitive), plus the floating `ThemeCustomizer` sheet and `UpgradeToProButton`. Sidebar `variant`/`collapsible`/`side` are runtime-configurable (not just CSS) via `SidebarConfigProvider` (`src/contexts/sidebar-context.tsx`, exposed through `useSidebarConfig`) — the layout branches its JSX structure (sidebar-before-vs-after-content) based on `config.side`. The theme customizer's "Layout" tab writes into this same context, so sidebar placement/behavior is live-editable from the UI at `src/components/theme-customizer/layout-tab.tsx`.

Nav content for the sidebar is a single static data object in `src/components/app-sidebar.tsx` (`navGroups` → groups → items, optionally with nested `items` for flyout submenus like Auth Pages/Errors/Settings). Add new sidebar entries there.

### Theming system

Theming is CSS-variable driven (Tailwind v4, no `tailwind.config` — see `components.json`: `cssVariables: true`, css entry `src/app/globals.css`) and has three independent layers, all orchestrated by `useThemeManager` (`src/hooks/use-theme-manager.ts`):

- Light/dark mode via `next-themes` (`ThemeProvider` in `src/components/theme-provider.tsx`, root-level in `app/layout.tsx`).
- Color theme presets: shadcn presets (`src/utils/shadcn-ui-theme-presets.ts`) and tweakcn presets (`src/utils/tweakcn-theme-presets.ts`), both normalized into `ColorTheme[]` in `src/config/theme-data.ts`.
- Radius and custom "imported" themes (raw CSS variables pasted by the user), typed in `src/types/theme-customizer.ts`.

The `ThemeCustomizer` (`src/components/theme-customizer/index.tsx`) is the single UI surface for all of this (`ThemeTab` for colors/radius, `LayoutTab` for sidebar config, `ImportModal` for pasting custom themes) and is lazy-loaded via `src/components/dynamic-imports.ts` (`ssr: false`) since it's non-critical UI. Follow that dynamic-import pattern for other heavy, below-the-fold, or client-only widgets.

### Dashboard page pattern

Reference `dashboard-2/page.tsx` for the convention: the page itself is a thin layout (`@container/main` + responsive grid classes like `grid-cols-1 @5xl:grid-cols-2`) that composes independent, self-fetching-mock-data components from its local `components/` folder (e.g. `MetricsOverview`, `SalesChart`, `RevenueBreakdown`). Charts use `recharts` wrapped by shadcn's `ChartContainer`/`ChartConfig` in `src/components/ui/chart.tsx` — use that wrapper rather than raw recharts components so colors track the active theme.

### Path aliases

`@/*` → `src/*` (see `tsconfig.json` and `components.json` aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`). shadcn/ui components live in `src/components/ui/`; add new shadcn primitives there via the shadcn CLI rather than hand-rolling equivalents.
