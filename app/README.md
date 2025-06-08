# Angular 20

## Overview

An Angular project with custom modifications to enhance structure, maintainability, and code consistency.

## Installation & Setup

To get started with project, follow these steps:

```sh
npm install
npm start
```

The project includes two environment configurations:

-   `environment.ts` (for local development)
-   `environment.prod.ts` (for production builds)

## Project Folder Structure

```
/public				# Static assets
/src
  /app
    /core			# Shared code between pages
    /modules		# Shared code between projects
    /pages			# Role-based pages (guest, user)
    /libs			# Role-based pages (guest, user)
  /environments		# Configuration files
```

## Component Structure

All Angular component classes should follow below structure:

1. **Readonly variables**
2. **Public variables**
3. **Constructor**
4. **Public functions**
5. **Private variables**
6. **Private functions**

### Naming Conventions

-   Private variables and functions should start with an underscore (`_`).
-   Services should be injected in the constructor like this:
    ```typescript
    public configService: ConfigService
    private _configService: ConfigService
    ```

## Page Structure

-   Use `ngFor` with a separate **component** and `trackBy` function.
-   The `core`, `modules` and `libs` folder should include well-documented code containing:
    -   **components**
    -   **directives**
    -   **interfaces**
    -   **pages** (folder with folders where each represent page with url)
    -   **pipes**
    -   **selectors** (components which include wselect with module document selector, used in modules folder only)
    -   **services**
-   The `core` folder contains shared code loaded across all pages.
-   The `pages` folder contains role-based pages:
    -   **Guest** (default role)
    -   **User** (authenticated user role)
-   The page `PAGE` folder which exists in `modules/NAME/pages/PAGE` and `pages/ROLE/PAGE` is just an compoent with an config routes for **lazy loading**.

## CLI Commands

Critical `waw` commands for generating project structures:

-   `waw add MODULENAME` - Creates a new module with:
    -   Interface
    -   Service
    -   Page
    -   Selector
    -   Form component
    -   Config
-   `waw page ROLE PAGENAME` - Creates a page under a specific role.
-   `waw service SERVICENAME` - Creates a service in the `core` folder.

For the full list of `waw` CLI commands, visit the **[waw Angular CLI repository](https://github.com/WebArtWork/waw-angular)**.

## Best Practices

-   **Do not use any interface decorators.**
-   **Avoid writing code twice (follow DRY principles).**
-   **Use async/await instead of then() when working with promises.**
-   **Avoid any type. Prefer unknown, Record<string, unknown>, or proper interfaces.**
-   **Keep functions pure whenever possible.**
-   **Keep third-party dependencies minimal and necessary.**

## Example Usage of `waw` CLI

To create a new module:

```sh
waw add user
```

This generates a `user` module with all necessary components.

To create a new page for a user role:

```sh
waw page user dashboard
```

To create a new service:

```sh
waw service user
```

## Contribution Guide

This project was forked from the **[ngx-platform repository](https://github.com/WebArtWork/ngx-platform)**. If you want to improve the code base, please submit a pull request to the base repository.

If you wish to contribute to this specific instance, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Follow the coding guidelines outlined in this document.
4. Submit a pull request for review.
