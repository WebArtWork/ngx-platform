import { NgClass } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	computed,
	input,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { Field } from '@angular/forms/signals';
import { TranslatePipe } from '@module/translate/pipes/translate.pipe';
import { ManualTypeDirective } from 'wacom';
import { InputType } from './input.type';

@Component({
	selector: 'winput',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Field, NgClass, TranslatePipe, ManualTypeDirective],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
})
export class InputComponent implements AfterViewInit {
	/* ---------------- Signal forms ---------------- */
	/**
	 * Angular Signal Forms field node.
	 *
	 * Usage:
	 *   <winput [field]="form.email" ...></winput>
	 */
	readonly field = input<any | null>(null);

	/* ---------------- Inputs ---------------- */
	readonly type = input<InputType>('text');
	readonly name = input('name');
	readonly label = input('');
	readonly placeholder = input('');
	readonly items = input<string[]>([]); // for radio/checkbox lists

	readonly disabled = input(false);
	readonly focused = input(false);
	readonly clearable = input(false);
	readonly wClass = input('');
	readonly autocomplete = input<string | null | undefined>(undefined);

	// Optional external error override (rarely needed when using Signal Forms)
	readonly error = input<string | null>(null);

	/* ---------------- Outputs ---------------- */
	readonly wChange = output<unknown>();
	readonly wSubmit = output<void>();
	readonly wBlur = output<void>();

	/* ---------------- Internal state ---------------- */
	showPassword = signal(false);

	private readonly _inputEl =
		viewChild<ElementRef<HTMLInputElement>>('inputEl');

	/* ---------------- Derived state ---------------- */
	readonly fieldState = computed(() => {
		const f = this.field();
		return f ? f() : null;
	});

	readonly fieldError = computed<string | null>(() => {
		const explicit = this.error();
		if (explicit) return explicit;

		const state = this.fieldState();
		if (!state) return null;

		const touched =
			typeof state.touched === 'function' ? state.touched() : false;
		const dirty = typeof state.dirty === 'function' ? state.dirty() : false;
		const invalid =
			typeof state.invalid === 'function' ? state.invalid() : false;

		if (!(invalid && (touched || dirty))) {
			return null;
		}

		const rawErrors =
			typeof state.errors === 'function' ? state.errors() : null;

		if (!rawErrors) return null;

		const errorsArray = Array.isArray(rawErrors)
			? rawErrors
			: Object.values(rawErrors);

		if (!errorsArray.length) return null;

		const first = errorsArray[0] as any;
		if (!first) return null;

		if (typeof first === 'string') return first;
		if (first.message && typeof first.message === 'string') {
			return first.message;
		}

		return null;
	});

	/* ---------------- Lifecycle ---------------- */
	ngAfterViewInit() {
		if (this.focused() && this._inputEl()) {
			this._inputEl()!.nativeElement.focus();
		}

		if (!this.field()) {
			console.warn(
				'[winput] No "field" input provided. Running in legacy mode. Prefer `[field]="form.control"` with Signal Forms.',
			);
		}
	}

	/* ---------------- Handlers ---------------- */
	onInput(event: Event) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		const type = target.type;

		let value: unknown = target.value;
		if (type === 'checkbox' && target instanceof HTMLInputElement) {
			value = target.checked;
		}

		this.wChange.emit(value);
	}

	onBlur() {
		this.wBlur.emit();
	}

	onSubmit() {
		this.wSubmit.emit();
	}

	onClear() {
		this.wChange.emit(null);
		this.onSubmit();
		if (this._inputEl()) {
			this._inputEl()!.nativeElement.focus();
		}
	}

	/* ---------------- Utility ---------------- */
	getAutocompleteAttr(type: InputType): string | null {
		const auto = this.autocomplete();
		if (auto !== undefined && auto !== null) return auto;
		return type === 'password' ? 'current-password' : null;
	}
}
