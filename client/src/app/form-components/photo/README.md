# Form Component: Photo

Unified photo picker for single or multiple images.

## Props (data.props)

- `Label: string` – UI label.
- `Accept: string` – MIME filter (default `image/*`).
- `Container: string` – upload bucket/container (default: `wFormId`).
- `Name: string` – file name hint (e.g., `userId.jpg`).
- `Multiple: boolean` – allow multiple files.
- `Preview: boolean` – show thumbnails (default `true`).
- `Clearable: boolean` – show Clear button (default `true`).
- `Width: number` – crop width (optional).
- `Height: number` – crop height (optional).

## Behavior

Binds to Virtual Form via `[formId]`/`[formKey]`. Emits `(wChange)` to notify the form engine of value changes.
