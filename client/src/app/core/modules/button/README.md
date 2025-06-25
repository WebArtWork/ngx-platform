# Button Component

The Button Component is a customizable standalone Angular component for creating various types of buttons—primary, secondary, success, danger, and more. It provides an easy way to manage button styles, states, and events in your Angular applications.

## Features

- Multiple button types: primary, secondary, success, danger, warning, info, light, dark, link
- Customizable classes for additional styling
- Supports disabled state
- Emits custom click events
- Fully standalone, uses Angular v20 `input()` and `output()`

## Installation

To install this component, use:

```cmd
waw add ngx-button
```

## Usage

### Importing the Standalone Component

Import the standalone `ButtonComponent` directly where you need it:

```typescript
import { signal } from '@angular/core';
import { ButtonComponent } from '.../button.component.ts';

@Component({
	imports: [ButtonComponent],
	template: `<wbutton ...>Button</wbutton>`
})
export class AppComponent {}
```

### Basic Example

**Simple usage:**

```html
<wbutton type="primary" (wClick)="onButtonClick()">Click Me</wbutton>
```

### Parent-to-Child Reactivity with Signals

You can use Angular signals in the parent and bind their value to the child.
This keeps the button input reactive:

```typescript
import { signal } from '@angular/core';

@Component({
	imports: [ButtonComponent],
	template: `
		<wbutton
			type="success"
			[disabled]="disabledSignal()"
			(wClick)="toggleDisabled()"
		>
			Toggle Disabled
		</wbutton>
	`
})
export class ParentComponent {
	disabledSignal = signal(false);

	toggleDisabled() {
		this.disabledSignal.set(!this.disabledSignal());
	}
}
```

- The button will enable/disable reactively as `disabledSignal` changes.

### Handling Different Button Types

Supported types:

- `primary`
- `secondary`
- `success`
- `danger`
- `warning`
- `info`
- `light`
- `dark`
- `link`

Example:

```html
<wbutton type="danger" (wClick)="onDangerClick()">Delete</wbutton>
```

### Custom Classes

Add extra classes for custom styling:

```html
<wbutton type="success" class="custom-class" (wClick)="onSuccessClick()">
	Save
</wbutton>
```

## API

### Inputs (`input()` API)

- **type** (`'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link'`, default `'primary'`): Button style
- **class** (`string`, default `''`): Extra CSS classes
- **disabled** (`boolean`, default `false`): Disabled state
- **disableSubmit** (`boolean`, default `false`): When true, button will not submit forms
- **click** (`(() => void) | undefined`): Custom function called on click (optional)

### Outputs (`output()` API)

- **wClick** (`void`): Emits when the button is clicked

## Customization

Style the button via the `class` input or by overriding CSS. The component uses BEM-like classes (e.g., `_primary`, `_success`, etc).

## Contributing

Contributions are welcome! Please open issues or submit pull requests. Follow the contribution guidelines.

## License

MIT License.
