import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
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
import { TranslatePipe } from '../translate/translate.pipe';
import { InputType, InputValue } from './input.type';

/**
 * InputComponent is a customizable input component that supports various types of inputs,
 * including text, radio buttons, checkboxes, and textareas. It also provides validation,
 * custom value replacement, and event handling for changes, submissions, and blur events.
 */
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule, NgClass, TranslatePipe],
	selector: 'winput',
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit, OnChanges {
	/**
	 * The value of the input field.
	 */
	readonly value = input<InputValue>('');

	activeValue = signal<InputValue>(null);

	readonly clearable = input(false);

	readonly replace = input<(value: InputValue) => InputValue>();

	readonly valid = input<(value: InputValue) => boolean>((value) => !!value);

	readonly items = input<string[]>([]);

	readonly placeholder = input('');

	readonly disabled = input(false);

	readonly focused = input(false);

	readonly wClass = input('');

	readonly name = input('name');

	readonly type = input<InputType>('text');

	readonly label = input('');

	readonly setFocus = input<{ focus: () => void }>();

	/**
	 * Event emitted when the input value changes.
	 */
	readonly wChange = output<InputValue>();

	/**
	 * Event emitted when the form is submitted.
	 */
	readonly wSubmit = output<InputValue>();

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
