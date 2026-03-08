# Contributing

This project is an Angular 21 application built with standalone components, zoneless change detection, signals-first patterns, Tailwind 4, and Wacom platform services.

## Prerequisites

- Node 20+
- npm 10+

Install dependencies:

```sh
npm install
```

## Local Development

Start the app locally:

```sh
npm start
```

This runs the Angular dev server with `proxy.conf.json` and opens the app in the browser.

Production build:

```sh
npm run build
```

Build output goes to `dist/app`.

## Project Layout

Key folders in this repo:

- `src/app/app.config.ts` for root providers and app bootstrap configuration
- `src/app/app.routes.ts` for the route map across public, guest, user, and admin flows
- `src/app/layouts/` for route shells such as public, guest, user, sidebar, topbar, and footer
- `src/app/pages/` for routed pages like `public/landing`, `guest/sign`, `user/dashboard`, `user/profile`, and `user/settings`
- `src/app/modules/` for feature domains such as user/admin flows
- `src/app/libs/` for reusable UI and feature libraries such as form, alert, button, input, modal, select, table, file, map, and translate
- `src/app/components/` for marketing-style standalone sections such as hero, faq, pricing, showcase, trust bar, and use cases
- `src/app/form-components/` and `src/app/app.formcomponents.ts` for dynamic form template registration
- `src/environments/` for API, branding, language, and default app configuration

## Architecture Notes

- Prefer standalone Angular components.
- Prefer signals for local state with `signal`, `computed`, and `effect`.
- Use function-based Angular APIs where practical: `input()`, `output()`, `viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()`, and `model()`.
- Prefer the new template control flow: `@if`, `@for`, and `@switch`.
- Use Wacom services and guards consistently with the existing app patterns.
- Dynamic form templates must be registered in `FORM_TEMPLATE_COMPONENTS` in `src/app/app.formcomponents.ts`.

## Code Style

- Use Conventional Commits: `type(scope): subject`
- Allowed commit types: `feat`, `fix`, `refactor`, `perf`, `docs`, `style`, `chore`, `build`, `ci`, `revert`
- Keep commit subjects imperative, present tense, short, and without a trailing period
- Keep one commit focused on one logical change
- Prefix private class fields and private functions with an underscore
- Keep component class members in this order:
  1. injections
  2. inputs, outputs, and view queries
  3. variables
  4. constructor
  5. lifecycle hooks
  6. public and private methods
- Document only public functions and public variables when a short comment adds real value

## Angular and Template Conventions

- Use signals-based forms APIs for new form work
- Avoid older decorator-heavy patterns when the function API fits
- In templates, if the same signal read, computed value, or method result is used more than once, assign it with `@let` and reuse it
- Keep templates readable; avoid long utility-class strings when the styling belongs in component SCSS

## Styling Conventions

- Use SCSS in components
- Use Tailwind with BEM-style component structure and `@apply` where it improves readability
- Prefer existing design tokens and CSS variables from `src/styles.scss`
- Avoid hard-coded hex colors and arbitrary spacing unless there is no token for the value
- Avoid hover effects that shift layout; use non-layout effects and provide matching `:focus-visible` states

## Environment and Configuration

- Local development settings are in `src/environments/environment.ts`
- Production defaults are in `src/environments/environment.prod.ts`
- When changing branding or SEO, update `environment.meta`
- When wiring a different backend, verify `url`, language options, roles, defaults, and sign-in presets

## Before Opening a PR

- Confirm the app still starts with `npm start`
- Run `npm run build` and resolve any production build issues
- Keep changes aligned with the existing standalone, signals-first architecture
- Update documentation when paths, scripts, or workflows change

## Pull Requests

When opening a pull request:

- describe the problem and the change clearly
- keep the scope focused
- mention any setup or migration steps
- include screenshots for UI changes when useful
- call out known limitations or follow-up work
