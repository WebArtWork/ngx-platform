import { NgClass } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	effect,
	ElementRef,
	inject,
	input,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreService } from 'wacom';
import { TranslatePipe } from '../../modules/translate/pipes/translate.pipe';
import { InputType, InputValue } from './input.type';

/**
 * InputComponent is a flexible and reactive input control that supports multiple input types
 * such as text, checkbox, radio, and textarea. It allows for dynamic validation, transformation
 * of values, and provides reactive outputs for value change, blur, and submit events.
 */
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule, NgClass, TranslatePipe],
	selector: 'winput',
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
})
export class InputComponent implements AfterViewInit {
	/**
	 * Initial value passed from the parent. Can be of string, number, boolean, or array types.
	 */
	readonly value = input<InputValue>('');

	/**
	 * Current value of the input, stored as a writable signal.
	 * Synchronized with `value` input.
	 */
	activeValue = signal<InputValue>(null);

	/**
	 * If true, shows a clear/reset button next to the input.
	 */
	readonly clearable = input(false);

	/**
	 * Optional function to transform or sanitize the value on change.
	 */
	readonly replace = input<(value: InputValue) => InputValue>();

	/**
	 * Function to validate the input value.
	 * Defaults to checking if the value is truthy.
	 */
	readonly valid = input<(value: InputValue) => boolean>((value) => !!value);

	/**
	 * List of selectable values, used for checkboxes or radio buttons.
	 */
	readonly items = input<string[]>([]);

	/**
	 * Placeholder text shown inside the input when empty.
	 */
	readonly placeholder = input('');

	/**
	 * If true, disables the input field.
	 */
	readonly disabled = input(false);

	/**
	 * If true, the input field will be automatically focused on init.
	 */
	readonly focused = input(false);

	/**
	 * Additional CSS classes to apply to the input element.
	 */
	readonly wClass = input('');

	/**
	 * The name attribute used for the input field.
	 */
	readonly name = input('name');

	/**
	 * Type of the input: 'text', 'password', 'email', 'checkbox', 'radio', or 'textarea'.
	 */
	readonly type = input<InputType>('text');

	/**
	 * Optional label text to display with the input.
	 */
	readonly label = input('');

	/**
	 * Event emitted when the input value changes after debouncing (250ms).
	 */
	readonly wChange = output<InputValue>();

	/**
	 * Event emitted when the input is submitted (e.g., Enter key).
	 */
	readonly wSubmit = output<InputValue>();

	/**
	 * Event emitted when the input loses focus.
	 */
	readonly wBlur = output<void>();

	/**
	 * Signal to represent validation error state.
	 */
	error = signal(false);

	/**
	 * Constructor sets up a reactive effect to sync incoming `value` with internal `activeValue`.
	 */
	constructor() {
		effect(() => this.activeValue.set(this.value()));
	}

	/**
	 * Angular lifecycle hook.
	 * Automatically focuses the input field after view init if `focused` is true.
	 */
	ngAfterViewInit(): void {
		if (this.focused()) {
			this.focus();
		}
	}

	/**
	 * Programmatically focuses the input element.
	 */
	focus(): void {
		this._inputEl().nativeElement.focus();
	}

	/**
	 * Triggered on user input change (e.g., typing).
	 * Applies the optional `replace` function if provided,
	 * and emits the new value through `wChange`.
	 * onChangeAfterWhile debounced by 2s to prevent frequent updates.
	 */
	onChange(): void {
		const replaceFn = this.replace();

		const current = this.activeValue();

		if (typeof replaceFn === 'function') {
			const next = replaceFn(current);

			if (next !== current) this.activeValue.set(next);
		}

		this.wChange.emit(this.activeValue());
	}
	onChangeAfterWhile(): void {
		this._core.afterWhile(this, this.onChange.bind(this), 2000);
	}

	/**
	 * Triggered when the form or input is submitted.
	 * Validates the current value using the `valid` function and emits through `wSubmit`.
	 * If validation fails, sets the `error` state.
	 */
	onSubmit(): void {
		this.onChange();

		const current = this.activeValue();

		if (typeof this.valid() === 'function' && this.valid()(current)) {
			this.wSubmit.emit(current);
		} else {
			this.error.set(true);
		}
	}

	/**
	 * Sets or unsets a checkbox item based on index and `add` flag.
	 * Used for managing multi-select checkbox logic.
	 * @param add - true to add, false to remove
	 * @param i - index of the item in `items` array
	 */
	setCheckboxValue(add: boolean, i: number): void {
		const current = (
			Array.isArray(this.activeValue()) ? this.activeValue() : []
		) as Array<string | number | boolean>;
		const value = this.items()[i];

		const updated = add
			? [...current, value]
			: current.filter((v) => v !== value);

		this.activeValue.set(updated as InputValue);
	}

	/**
	 * Determines whether a given item is currently selected in the active value array.
	 * Used primarily for checkbox inputs where multiple selections are allowed.
	 *
	 * @param item - The item to check for presence in the current value array.
	 * @returns True if the item is present in the array, false otherwise.
	 */
	isChecked(item: string | number | boolean): boolean {
		const value = this.value();

		if (Array.isArray(value)) {
			return (value as Array<string | number | boolean>).includes(item);
		}

		return false;
	}

	/**
	 * Reference to the native input element in the template.
	 * Required viewChild ensures it's always present.
	 */
	private _inputEl =
		viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

	/**
	 * Injected core service used for debouncing (afterWhile).
	 */
	private _core = inject(CoreService);
}
