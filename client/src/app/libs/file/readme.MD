[![Angular v21+](https://img.shields.io/badge/angular-v21+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW File Library (`ngx-file`)

Signal-based file picker + uploader for Angular **v21+** with optional image preview and crop modal.

Includes:

- `<ngx-file>` — file picker/uploader (single/multi, image/file modes)
- `<app-file-cropper>` — cropper content used inside a modal (via `ngx-image-cropper`)
- `<file-selector>` — select an existing uploaded file using `<wselect>`
- `FileService.uploadBase64()` — upload helper used by the component

---

## Installation

```bash
waw add ngx-file
```

---

## Import

```ts
import { FileComponent } from '@lib/file';
// optional:
import { FileSelectorComponent } from '@lib/file';

@Component({
	imports: [FileComponent, FileSelectorComponent],
})
export class DemoComponent {}
```

---

## Basic usage

### Single image (default)

```html
<ngx-file [(wImage)]="avatarUrl"></ngx-file>
```

### Single file

```html
<ngx-file mode="single-file" [(wFile)]="docUrl"></ngx-file>
```

### Multiple images

```html
<ngx-file mode="multi-image" [(wImages)]="gallery"></ngx-file>
```

### Multiple files

```html
<ngx-file mode="multi-file" [(wFiles)]="attachments"></ngx-file>
```

---

## Views

`view` controls how the picker is rendered:

- `dropzone` (default UI container with list + buttons)
- `list` (same branch as default container UI)
- `thumb-only` (compact: shows only the first item / preview)

Example:

```html
<ngx-file view="thumb-only" [(wImage)]="logoUrl"></ngx-file>
```

---

## Cropping images

If you set both `cropWidth` and `cropHeight` and the mode is an **image** mode,
the component opens a crop modal for each selected image.

```html
<ngx-file
	mode="single-image"
	[cropWidth]="1080"
	[cropHeight]="1080"
	[(wImage)]="avatarUrl"
></ngx-file>
```

> Cropping uses `ModalService` + `FileCropperComponent` (which wraps `ngx-image-cropper`).

---

## Custom templates

You can override how empty state and items are rendered.

- `t_empty` — template for empty state
- `t_item` — template for each item (gets `$implicit = src`, `index`)

```html
<ng-template #emptyTpl>
	<div class="my-empty">Drop or browse…</div>
</ng-template>

<ng-template #itemTpl let-src let-index="index">
	<div class="my-item">
		<span>#{{ index }}:</span>
		<span>{{ src }}</span>
	</div>
</ng-template>

<ngx-file
	mode="multi-file"
	[t_empty]="emptyTpl"
	[t_item]="itemTpl"
	[(wFiles)]="files"
></ngx-file>
```

---

## Selecting an existing file (`file-selector`)

`<file-selector>` is a small wrapper around `<wselect>` that loads file docs from `FileService`.

```html
<file-selector [(wModel)]="fileId"></file-selector>
```

---

## API

### `<ngx-file>` inputs

| Input         | Type                                                               | Default          | Notes                            |
| ------------- | ------------------------------------------------------------------ | ---------------- | -------------------------------- |
| `label`       | `string`                                                           | `''`             | Optional label above picker      |
| `placeholder` | `string`                                                           | `'Select file'`  | Empty state text                 |
| `disabled`    | `boolean`                                                          | `false`          | Disables all actions             |
| `clearable`   | `boolean`                                                          | `true`           | Shows clear actions              |
| `accept`      | `string`                                                           | `'*/*'`          | Passed to native file input      |
| `preview`     | `boolean`                                                          | `true`           | Shows thumbnail for image URLs   |
| `mode`        | `'single-image' \| 'single-file' \| 'multi-image' \| 'multi-file'` | `'single-image'` | Controls which model is used     |
| `view`        | `'dropzone' \| 'list' \| 'thumb-only'`                             | `'dropzone'`     | UI layout                        |
| `cropWidth`   | `number \| null`                                                   | `null`           | Enables cropping for image modes |
| `cropHeight`  | `number \| null`                                                   | `null`           | Enables cropping for image modes |
| `t_item`      | `TemplateRef`                                                      | —                | Custom item template             |
| `t_empty`     | `TemplateRef`                                                      | —                | Custom empty template            |
| `container`   | `string`                                                           | `'general'`      | Sent to upload API               |
| `name`        | `string`                                                           | `''`             | Sent to upload API               |

### `<ngx-file>` models (two-way)

Exactly one (or more) of these should be used depending on `mode`:

| Model     | Type             | Used by mode   |
| --------- | ---------------- | -------------- |
| `wImage`  | `string \| null` | `single-image` |
| `wFile`   | `string \| null` | `single-file`  |
| `wImages` | `string[]`       | `multi-image`  |
| `wFiles`  | `string[]`       | `multi-file`   |

---

## Backend expectation

`FileService.uploadBase64()` posts to:

- `POST /api/file/photo` with `{ container, name, dataUrl }`
- expects a URL string response

---

## Styling

BEM block: `.wfile`

Common elements:

- `__label`, `__body`, `__list`, `__item`, `__name`, `__thumb`, `__remove`, `__actions`

Uses tokens:

- `--c-border`, `--c-primary`, `--c-bg-*`, `--c-text-*`, `--b-radius*`, `--focus-ring`, `--sp-*`

---

MIT © 2026 Web Art Work
