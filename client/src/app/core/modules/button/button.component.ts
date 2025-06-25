import { Component, input, output } from '@angular/core';

/**
 * ButtonComponent is a reusable Angular component for buttons.
 * It supports multiple styles, custom classes, disabled states,
 * and emits events when clicked.
 */
@Component({
	selector: 'wbutton',
	templateUrl: './button.component.html'
})
export class ButtonComponent {
	readonly type = input<
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'light'
		| 'dark'
		| 'link'
	>('primary');

	/**
	 * Additional CSS classes for the button.
	 * Default: ''.
	 */
	readonly class = input<string>('');

	/**
	 * Controls whether the button is disabled.
	 * Default: false.
	 */
	readonly disabled = input<boolean>(false);

	/**
	 * Determines whether the button prevents form submission.
	 * If true, the button does not submit the form when inside a form.
	 * Default: false.
	 */
	readonly disableSubmit = input<boolean>(false);

	/**
	 * Custom function executed when the button is clicked.
	 * If undefined, the button behaves normally.
	 */
	readonly click = input<(() => void) | undefined>(undefined);

	/**
	 * Event emitted when the button is clicked.
	 */
	readonly wClick = output<void>();

	/**
	 * Handles the click event.
	 * If the button is disabled, the event is ignored.
	 * Executes the custom click function if provided.
	 * Emits the wClick event.
	 */
	clicked(): void {
		if (this.disabled()) {
			return;
		}

		if (typeof this.click() === 'function') {
			this.click()?.();
		}

		this.wClick.emit();
	}
}
