import { NgClass } from '@angular/common';
import {
	Component,
	ElementRef,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewChild,
	input,
	output,
	signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Value } from '../select/select.component';
import { TranslatePipe } from '../translate/translate.pipe';

export type Value =
	| null
	| string
	| number
	| boolean
	| string[]
	| number[]
	| boolean[];

/**
 * InputComponent is a customizable input component that supports various types of inputs,
 * including text, radio buttons, checkboxes, and textareas. It also provides validation,
 * custom value replacement, and event handling for changes, submissions, and blur events.
 */
@Component({
	selector: 'winput',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	imports: [FormsModule, NgClass, TranslatePipe]
})
export class InputComponent implements OnInit, OnChanges {
	/**
	 * The value of the input field.
	 */
	readonly value = input<Value>('');

	activeValue = signal<Value>(null);

	readonly clearable = input(false);

	readonly replace = input<(value: Value) => Value>();

	readonly valid = input<(value: Value) => boolean>((value) => !!value);

	readonly items = input<string[]>([]);

	readonly placeholder = input('');

	readonly disabled = input(false);

	readonly focused = input(false);

	readonly wClass = input('');

	readonly name = input('name');

	readonly type = input<
		| 'text'
		| 'password'
		| 'email'
		| 'radio'
		| 'checkbox'
		| 'textarea'
		| 'search'
		| 'tel'
		| 'url'
		| 'number'
		| 'range'
		| 'color'
		| 'date'
		| 'month'
		| 'week'
		| 'time'
		| 'datetime'
		| 'datetime-local'
	>('text');

	readonly label = input('');

	readonly setFocus = input<{ focus: () => void }>();

	/**
	 * Event emitted when the input value changes.
	 */
	readonly wChange = output<Value>();

	/**
	 * Event emitted when the form is submitted.
	 */
	readonly wSubmit = output<Value>();

	/**
	 * Event emitted when the input field loses focus.
	 */
	readonly wBlur = output<void>();

	/**
	 * Reference to the input element in the template.
	 */
	@ViewChild('inputEl') inputEl: ElementRef;

	/**
	 * Error state of the input field, set to true if validation fails.
	 */
	error = signal(false);

	/**
	 * Initializes the component. Focuses the input field if the focused input is true.
	 */
	ngOnInit(): void {
		// if (this.focused()) {
		// 	this.focus();
		// }
		// if (this.setFocus) {
		// 	this.setFocus.focus = this.focus.bind(this);
		// }
	}

	/**
	 * Detect changes.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		// if (changes['disabled']) {
		// 	this.disabled = changes['disabled'].currentValue;
		// }
		// if (changes['value'] && this.value !== changes['value'].currentValue) {
		// 	this.value = changes['value'].currentValue;
		// }
	}

	/**
	 * Focuses the input field.
	 */
	focus(): void {
		// setTimeout(() => {
		// 	this.inputEl.nativeElement.focus();
		// }, 100);
	}

	/**
	 * Handles the change event for the input field.
	 * Applies the replace function if provided, and emits the new value.
	 */
	onChange(): void {
		// this._core.afterWhile(
		// 	'winput',
		// 	(): void => {
		// 		this.value =
		// 			typeof this.replace === 'function'
		// 				? this.replace(this.value)
		// 				: this.value;
		// 		this.wChange.emit(this.value);
		// 	},
		// 	100
		// );
	}

	/**
	 * Handles the submit event for the input field.
	 * Validates the input value before emitting the submit event.
	 */
	onSubmit(): void {
		// if (this.valid(this.value)) {
		// 	this.wSubmit.emit(this.value);
		// } else {
		// 	this.error = true;
		// }
	}

	setCheckboxValue(add: boolean, i: number): void {
		// this.value = Array.isArray(this.value) ? this.value : [];
		// const index = (
		// 	this.value as Array<string | number | boolean>
		// ).findIndex((item) => item === this.items[i]);
		// if (index !== -1) {
		// 	(this.value as Array<string | number | boolean>).splice(index, 1);
		// }
		// if (add) {
		// 	(this.value as Array<string | number | boolean>).push(
		// 		this.items[i]
		// 	);
		// }
	}
}
