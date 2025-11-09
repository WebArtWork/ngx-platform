// client/src/app/libs/input/input.component.ts
import { NgClass } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	Signal,
	effect,
	inject,
	input,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormsModule } from '@angular/forms';
import {
	VirtualFormFieldValue,
	VirtualFormService,
	VirtualValidatorFn,
} from 'src/app/virtual-form.service';
import { CoreService } from 'wacom';
import { TranslatePipe } from '../../modules/translate/pipes/translate.pipe';
import { InputType, InputValue } from './input.type';

/**
 * Signal-based input that supports:
 * - Template-driven forms via [(wModel)]
 * - Reactive Forms via [control]
 * - Virtual Forms via [formId] + [formKey]
 *
 * Priority (read): control → wForm → wModel → value
 * Priority (write): wForm → control → wModel
 */
@Component({
	selector: 'winput',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule, NgClass, TranslatePipe],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
})
export class InputComponent implements AfterViewInit {
	/* ---------------- Inputs ---------------- */
	/** One-way value (used when no control and no wForm and no wModel). */
	readonly value = input<InputValue>('');
	/** Two-way API for template-driven forms. Bind with [(wModel)]. */
	readonly wModel = input<InputValue | undefined>(undefined);
	readonly wModelChange = output<InputValue>();

	/** Reactive Forms control (highest read priority). */
	readonly control = input<AbstractControl | null>(null);

	/** WAW Virtual Form hookup (activates only if both provided). */
	readonly formId = input<string | null>(null);
	readonly formKey = input<string | null>(null);
	readonly validators = input<VirtualValidatorFn[]>([]);

	/** Options (for radio / checkbox list). */
	readonly items = input<string[]>([]);

	/** Type, name, placeholder, label. */
	readonly type = input<InputType>('text');
	readonly name = input('name');
	readonly placeholder = input('');
	readonly label = input('');

	/** Disabled, auto-focus, clearable, class, autocomplete. */
	readonly disabled = input(false);
	readonly focused = input(false);
	readonly clearable = input(false);
	readonly wClass = input('');
	readonly autocomplete = input<string | null | undefined>(undefined);

	/** Replace / valid hooks for non-reactive usage. */
	readonly replace = input<(v: InputValue) => InputValue>();
	readonly valid = input<(v: InputValue) => boolean>((v) => !!v);

	/* ---------------- Outputs ---------------- */
	readonly wChange = output<InputValue>(); // debounced (~2s)
	readonly wSubmit = output<InputValue>();
	readonly wBlur = output<void>();

	/* ---------------- Internal state ---------------- */
	/** Single source-of-truth for the view. */
	model = signal<InputValue>(null);

	/** Error state (from control OR wForm OR local valid()). */
	error = signal(false);

	/** Whether wForm integration is active. */
	private _usewForm = signal(false);

	/** Native element ref used for focus(). */
	private _inputEl = viewChild.required<ElementRef<HTMLElement>>('inputEl');

	/* ---------------- Services ---------------- */
	private _core = inject(CoreService);
	private _destroyRef = inject(DestroyRef);
	private _virtualFormService = inject(VirtualFormService);

	/* ---------------- wForm field API ---------------- */
	private _fieldApi: {
		value: Signal<VirtualFormFieldValue>;
		error: Signal<string | null>;
		touched: Signal<boolean>;
		setValue: (v: VirtualFormFieldValue) => void;
		setTouched: (t: boolean) => void;
		getValue: () => VirtualFormFieldValue;
		validate: () => string | null;
	} | null = null;

	constructor() {
		/* Activate / register to VirtualFormService when both formId & formKey exist. */
		effect(() => {
			const enabled = !!this.formId() && !!this.formKey();
			this._usewForm.set(enabled);

			if (!enabled) {
				this._fieldApi = null;
				return;
			}

			this._fieldApi = this._virtualFormService.registerField(
				this.formId()!,
				this.formKey()!,
				this.model() as VirtualFormFieldValue,
				this.validators(),
			);
		});

		/* Sync model FROM the highest-priority source. */
		effect(() => {
			const c = this.control();
			if (c) {
				// initial
				this.model.set(c.value as InputValue);
				this._reflectControlError();
				// live updates
				c.valueChanges
					?.pipe(takeUntilDestroyed(this._destroyRef))
					.subscribe((v) => {
						this.model.set(v as InputValue);
						this._reflectControlError();
					});
				return;
			}

			if (this._usewForm() && this._fieldApi) {
				// reflect from virtual form
				this.model.set(this._fieldApi.value() as unknown as InputValue);
				this.error.set(!!this._fieldApi.error());
				return;
			}

			// when wModel is bound (not undefined) → use it
			const m = this.wModel();
			if (m !== undefined) {
				this.model.set(m as InputValue);
				return;
			}

			// fallback to one-way input value
			this.model.set(this.value());
		});
	}

	/* ---------------- Lifecycle ---------------- */
	ngAfterViewInit(): void {
		if (this.focused()) this.focus();
	}

	focus(): void {
		this._inputEl().nativeElement.focus();
	}

	/* ---------------- Handlers ---------------- */
	onChange(): void {
		// optional replacement
		const repl = this.replace();
		const cur = this.model();
		if (typeof repl === 'function') {
			const next = repl(cur);
			if (next !== cur) this.model.set(next);
		}

		// write to highest target
		if (this._usewForm() && this._fieldApi) {
			this._fieldApi.setValue(this.model() as VirtualFormFieldValue);
			this.error.set(!!this._fieldApi.error());
		} else {
			const c = this.control();
			if (c) {
				c.setValue(this.model(), { emitEvent: true });
				this._reflectControlError();
			} else if (this.wModel() !== undefined) {
				this.wModelChange.emit(this.model());
			}
		}

		// debounced change
		this._core.afterWhile(
			this,
			() => this.wChange.emit(this.model()),
			2000,
		);
	}

	onChangeAfterWhile(): void {
		this.error.set(false);
		this.onChange();
	}

	onBlur(): void {
		this.wBlur.emit();

		if (this._usewForm() && this._fieldApi) {
			this._fieldApi.setTouched(true);
			this.error.set(!!this._fieldApi.error());
			return;
		}

		const c = this.control();
		if (c) {
			c.markAsTouched();
			this._reflectControlError();
		}
	}

	onSubmit(): void {
		this.onChange();

		if (this._usewForm() && this._fieldApi) {
			this._fieldApi.validate();
			this.error.set(!!this._fieldApi.error());
			this.wSubmit.emit(this.model());
			return;
		}

		const c = this.control();
		if (c) {
			c.markAsTouched();
			this._reflectControlError();
			this.wSubmit.emit(this.model());
			return;
		}

		// local validation
		if (this.valid()(this.model())) {
			this.wSubmit.emit(this.model());
		} else {
			this.error.set(true);
		}
	}

	/* ---------------- Checkbox helpers ---------------- */
	setCheckboxValue(add: boolean, i: number): void {
		const list = (Array.isArray(this.model()) ? this.model() : []) as Array<
			string | number | boolean
		>;
		const item = this.items()[i];

		const updated = add ? [...list, item] : list.filter((v) => v !== item);
		this.model.set(updated as InputValue);
		this.onChange();
	}

	isChecked(item: string | number | boolean): boolean {
		const v = this.model();
		return Array.isArray(v)
			? (v as Array<string | number | boolean>).includes(item)
			: false;
	}

	/* ---------------- Utility ---------------- */
	getAutocompleteAttr(type: InputType): string | null {
		const auto = this.autocomplete();
		if (auto !== undefined && auto !== null) return auto;
		return type === 'password' ? 'current-password' : null;
	}

	private _reflectControlError(): void {
		const c = this.control();
		if (!c) return;
		this.error.set(!!(c.invalid && (c.touched || c.dirty)));
	}
}
