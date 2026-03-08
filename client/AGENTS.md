# AGENTS.md

This file gives coding agents the minimum project context needed to make safe, consistent changes in this repository.

## Project Summary

- Angular 21 application
- Standalone components
- Zoneless change detection
- Signals-first patterns
- Tailwind 4 + SCSS
- Wacom platform services for routing meta, CRUD helpers, guards, and app-level integration

## Local Commands

- Install dependencies: `npm install`
- Start dev server: `npm start`
- Production build: `npm run build`

Notes:

- `npm start` uses `proxy.conf.json`
- production output goes to `dist/app`

## Important Paths

- `src/app/app.config.ts`: root providers and bootstrap setup
- `src/app/app.routes.ts`: route map
- `src/app/layouts/`: route shells and shared layout pieces
- `src/app/pages/`: routed pages
- `src/app/modules/`: feature domains
- `src/app/libs/`: reusable libraries and shared UI primitives
- `src/app/components/`: marketing and landing-page style sections
- `src/app/form-components/`: dynamic form template components
- `src/app/app.formcomponents.ts`: form template registry
- `src/environments/`: environment and branding configuration

## Current Route Areas

- public: `public/landing`
- guest: `guest/sign`
- user: `user/dashboard`, `user/profile`, `user/settings`
- admin: users, clients, forms, translates

Check `src/app/app.routes.ts` before changing route assumptions.

## Architectural Rules

- Prefer standalone Angular components.
- Prefer signals for local state: `signal`, `computed`, `effect`.
- Prefer function-based Angular APIs where they fit: `input()`, `output()`, `viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()`, `model()`.
- Prefer modern template control flow: `@if`, `@for`, `@switch`.
- Keep new code aligned with existing Wacom service and guard patterns.

## Forms

- New form work should follow the repo's signals-first direction.
- Dynamic form templates must be registered in `FORM_TEMPLATE_COMPONENTS` in `src/app/app.formcomponents.ts`.
- If a schema references a template component by name, verify the name matches the registration exactly.

## Component Conventions

- Keep class members in this order:
  1. injections
  2. inputs / outputs / view queries
  3. variables
  4. constructor
  5. lifecycle hooks
  6. methods
- Prefix private fields and private methods with `_`.
- Add comments only when they add real value, especially for public APIs or non-obvious logic.

## Template and Styling Conventions

- If the same template expression is used more than once, assign it with `@let` and reuse it.
- Keep templates readable; do not push large styling decisions into long class strings if component SCSS is clearer.
- Use SCSS in components.
- Use Tailwind with the existing BEM-style structure and `@apply` when it improves maintainability.
- Prefer existing CSS variables and design tokens from `src/styles.scss`.
- Avoid hard-coded hex colors and arbitrary spacing unless necessary.
- Avoid hover effects that shift layout; pair interactive states with `:focus-visible`.

## Environment and Branding

- `src/environments/environment.ts` contains local development overrides.
- `src/environments/environment.prod.ts` contains production defaults.
- Update `environment.meta` when changing branding, SEO, or shared metadata.
- When backend integration changes, verify `url`, roles, languages, defaults, and sign-in presets.

## Documentation Expectations

- Keep `README.md`, `CONTRIBUTING.md`, and this file aligned with the actual codebase.
- If you move directories, rename major routes, or change scripts, update the docs in the same change.
- Do not document directories or commands that do not exist in the current repo.

## Validation

For meaningful code changes, prefer this verification sequence:

1. run `npm start` if behavior needs local runtime validation
2. run `npm run build` before finishing

If you cannot run verification, state that clearly.

## Change Discipline

- Keep edits focused.
- Do not rewrite unrelated areas.
- Check for existing repo patterns before introducing a new one.
- Preserve user changes already in the working tree unless explicitly asked to modify them.
