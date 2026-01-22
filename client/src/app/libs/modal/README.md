[![Angular v21+](https://img.shields.io/badge/angular-v21+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# `ngx-modal` — Modal service

Lightweight, programmatic modal system for Angular using dynamic component injection.

Designed to work with **DomService**, supports stacking, uniqueness, size presets, and lifecycle hooks.

---

## ✨ Features

- Programmatic API (`ModalService`)
- Dynamic component injection
- Multiple size presets: `small | mid | big | full`
- Optional backdrop close
- Unique modals (prevent duplicates)
- Auto-close with timeout
- Tailwind-first layout, minimal SCSS
- Stack-aware (`modalOpened` body class)
- URL back-button (`popstate`) closes modal
- Works with any component as content

---

## 📦 Install

```bash
waw add ngx-modal
```

---

## 🧩 Basic Usage

```ts
import { ModalService } from '@libs/modal';

@Component({...})
export class PageComponent {
	constructor(private modal: ModalService) {}

	open() {
		this.modal.open({
			component: MyModalContentComponent,
		});
	}
}
```

---

## 🧱 Modal Content Component

Any standalone or declared component can be used:

```ts
@Component({
	standalone: true,
	template: `<div>My modal content</div>`,
})
export class MyModalContentComponent {}
```

---

## ⚙️ ModalConfig

```ts
export interface ModalConfig {
	size?: 'small' | 'mid' | 'big' | 'full';

	/** Custom class for modal panel */
	panelClass?: string;

	/** Legacy alias (mapped to panelClass) */
	class?: string;

	/** Prevent multiple instances */
	unique?: string;

	/** Auto-close after ms */
	timeout?: number;

	/** Whether close button + backdrop close are enabled */
	closable?: boolean;

	/** Lifecycle hooks */
	onOpen?: () => void;
	onClose?: () => void;
	onClickOutside?: () => void;
}
```

Defaults:

```ts
{
	size: 'mid',
	timeout: 0,
	panelClass: '',
	closable: true,
}
```

---

## 📐 Sizes

| Size          | Max width         |
| ------------- | ----------------- |
| small         | 480px             |
| mid (default) | 960px             |
| big           | 1200px            |
| full          | 1440px / viewport |

Example:

```ts
this.modal.open({
	component: MyModal,
	size: 'big',
});
```

---

## 🔒 Unique Modals

Prevent opening the same modal twice:

```ts
this.modal.open({
	component: MyModal,
	unique: 'settings-modal',
});
```

If a modal with the same `unique` key exists, it will be reused.

---

## ⏱ Auto-close

```ts
this.modal.open({
	component: MyModal,
	timeout: 3000, // closes after 3s
});
```

---

## ❌ Closing the Modal

From **outside** (service):

```ts
const ref = this.modal.show({
	component: MyModal,
});

ref.close();
```

From **inside content component**:

```ts
constructor(@Inject('close') private close: () => void) {}

this.close();
```

(Injected automatically via `DomService` projection.)

---

## 🖱 Backdrop Click

- Clicking the backdrop calls `onClickOutside`
- Defaults to `close()`
- Can be overridden

```ts
this.modal.open({
	component: MyModal,
	onClickOutside: () => console.log('Backdrop clicked'),
});
```

---

## 🧠 Notes

- Modal shell is rendered once per instance using `DomService`
- Content is injected into `.wacom-modal__body`
- Body scrolling is locked via `modalOpened` class
- Back button (`popstate`) automatically closes the top modal
- Stacking is supported (multiple modals at once)

---

## 🪪 License

MIT © 2026 Web Art Work
