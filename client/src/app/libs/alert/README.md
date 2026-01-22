[![Angular v21+](https://img.shields.io/badge/angular-v21+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Alert (`ngx-alert`)

A lightweight, DOM-injected alert/toast system for Angular **v21+**.

- Multiple positions (top, bottom-right, center, etc.)
- Types: `info | success | warning | error | question`
- Optional progress bar + auto-dismiss
- Hover **pauses** auto-dismiss (handled by `AlertComponent`)
- “Question” alerts with action buttons
- `unique` key to prevent duplicates
- Global defaults via `setConfig()`

> Alerts are rendered dynamically via `DomService` into a fixed `WrapperComponent` that provides the position containers.

---

## Installation

```bash
waw add ngx-alert
```

---

## Import / Setup

The service is `providedIn: 'root'`. No module import is required.

Just inject `AlertService` where you need it:

```ts
import { Component, inject } from '@angular/core';
import { AlertService } from '@lib/alert';

@Component({
	/* ... */
})
export class DemoComponent {
	private alert = inject(AlertService);

	save() {
		this.alert.success({ text: 'Saved!' });
	}
}
```

---

## Basic usage

### Show (string shorthand)

```ts
alert.show('Hello!');
```

### Show (full config)

```ts
alert.show({
	text: 'Profile updated',
	type: 'success',
	position: 'bottomRight',
	timeout: 2500,
	progress: true,
	closable: true,
});
```

### Convenience helpers

```ts
alert.info({ text: 'Info message' });
alert.success({ text: 'Done' });
alert.warning({ text: 'Be careful' });
alert.error({ text: 'Something went wrong' });
```

---

## Question alerts (actions)

`type: "question"` renders buttons inside the alert:

```ts
alert.question({
	text: 'Delete this item?',
	buttons: [
		{ text: 'No' },
		{
			text: 'Yes',
			callback: () => {
				// your action
			},
		},
	],
});
```

When a button is clicked, the alert is removed and `callback` is invoked.

---

## Prevent duplicates (`unique`)

If you pass `unique`, only one alert with that key can exist at a time:

```ts
alert.show({
	unique: 'offline',
	type: 'warning',
	text: 'You are offline',
	timeout: 0, // keep it until manually closed
});
```

Calling again with the same `unique` returns the existing alert instance.

---

## Position

Supported positions:

- `topLeft`, `top`, `topRight`
- `left`, `center`, `right`
- `bottomLeft`, `bottom`, `bottomRight`

Example:

```ts
alert.show({ text: 'Top right', position: 'topRight' });
```

---

## Auto-dismiss, progress, hover pause

- `timeout` controls auto-dismiss in **milliseconds**
- `progress: true` shows a progress bar
- Hovering the alert pauses the timer (implemented in `AlertComponent`)

Examples:

```ts
// 3 seconds (default), with progress
alert.show({ text: 'Auto close', timeout: 3000, progress: true });

// persistent until user closes
alert.show({ text: 'Persistent', timeout: 0, progress: false, closable: true });
```

---

## Global configuration

Set defaults for all future alerts:

```ts
alert.setConfig({
	position: 'bottomRight',
	timeout: 4000,
	progress: true,
	closable: true,
	class: 'my-alerts',
});
```

---

## API

### `AlertService`

- `show(opts: Alert | string): Alert`
- `open(opts: Alert): void` (alias for `show`)
- `info(opts: Alert): void`
- `success(opts: Alert): void`
- `warning(opts: Alert): void`
- `error(opts: Alert): void`
- `question(opts: Alert): void`
- `destroy(): void` — closes all alerts
- `setConfig(config: AlertConfig): void` — sets global defaults

### `AlertConfig` (main options)

- `text?: string`
- `type?: 'info' | 'error' | 'success' | 'warning' | 'question'`
- `position?: AlertPosition`
- `buttons?: { text: string; callback?: () => void }[]`
- `icon?: string`
- `class?: string`
- `unique?: string`
- `progress?: boolean`
- `timeout?: number`
- `closable?: boolean`

---

## Styling

BEM block: `.alert-lib`

- Container: `.alert-lib`
- Content: `.alert-lib__content`
- Progress: `.alert-lib__progress`, `.alert-lib__progress-bar`
- Actions: `.alert-lib__actions`, `.alert-lib__button`
- Close: `.alert-lib__close`

Wrapper block: `.alert-lib-wrapper` creates fixed containers for each position.

### Useful CSS variables

- `--alert-lib-z-index` (default: `99999`)
- `--alert-lib-surface`, `--alert-lib-border`
- `--alert-lib-text-color`, `--alert-lib-close-color`
- `--alert-lib-*-bg` (info/error/success/warning/question)

---

## Notes

- `timeout` is owned by `AlertComponent` so the closing animation is always played and hover pause works reliably.
- For reduced motion users, animations are disabled via `prefers-reduced-motion`.

---

MIT © 2026 Web Art Work
