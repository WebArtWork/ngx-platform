import { NgClass } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	computed,
	input,
	model,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { Field } from '@angular/forms/signals';
import { TranslatePipe } from '@module/translate/pipes/translate.pipe';
import { ManualTypeDirective } from 'wacom';
import { InputType, InputValue } from './input.type';

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

	/* ---------------- Template-model mode ---------------- */
	readonly wModel = model<InputValue | null>(null, { alias: 'wModel' });

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
	readonly wChange = output<InputValue | null>();
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
	}

	/* ---------------- Handlers ---------------- */
	onInput(event: Event, option?: string) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		const nativeType = (target as HTMLInputElement).type;

		let value: InputValue | null = null;

		if (nativeType === 'checkbox' && target instanceof HTMLInputElement) {
			// Multi-checkbox list with items → wModel as string[]
			if (option != null && this.items().length && !this.field()) {
				const current = this.wModel() as InputValue;
				const list = Array.isArray(current)
					? [...(current as any[])]
					: [];
				const idx = list.indexOf(option);

				if (target.checked && idx === -1) {
					list.push(option);
				} else if (!target.checked && idx !== -1) {
					list.splice(idx, 1);
				}

				value = list as InputValue;
			} else {
				// Single checkbox (field or standalone boolean)
				value = target.checked;
			}
		} else if (nativeType === 'radio') {
			// Radio always emits selected option (string)
			if (option != null) {
				value = option;
			} else {
				value = target.value;
			}
		} else {
			// text / textarea / others
			value = target.value;
		}

		// standalone mode → keep wModel in sync
		if (!this.field()) {
			this.wModel.set(value);
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
		if (!this.field()) {
			this.wModel.set(null);
		}
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

	isItemChecked(item: any): boolean {
		const model = this.wModel();
		return Array.isArray(model) ? (model as any[]).includes(item) : !!model;
	}
}
