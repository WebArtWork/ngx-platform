import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Signal,
	TemplateRef,
	computed,
	effect,
	forwardRef,
	inject,
	input,
	model,
	output,
	signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VirtualFormService } from 'src/app/virtual-form.service'; // ensure correct path
import { ClickOutsideDirective, CoreService, SearchPipe } from 'wacom';
import { TranslateDirective } from '../../modules/translate/directives/translate.directive';
import { TranslatePipe } from '../../modules/translate/pipes/translate.pipe';
import { InputComponent } from '../input/input.component';
import { SelectButton, SelectItem } from './select.interface';
import { SelectId, SelectValue } from './select.type';

@Component({
	selector: 'wselect',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgTemplateOutlet,
		SearchPipe,
		TranslateDirective,
		TranslatePipe,
		InputComponent,
		ClickOutsideDirective,
	],
	templateUrl: './select.component.html',
	styleUrl: './select.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
	],
})
export class SelectComponent implements ControlValueAccessor {
	/* ===== Inputs ===== */
	readonly disabled = input(false);
	readonly clearable = input(false);
	readonly placeholder = input('');
	readonly multiple = input(false);
	readonly bindLabel = input('name');
	readonly bindValue = input('_id');
	readonly label = input('');
	readonly searchable = input(false);
	readonly searchableBy = input('name');
	readonly items = input<unknown[]>([]);
	readonly buttons = input<SelectButton[]>([]);

	/** Templates */
	readonly t_view = input<TemplateRef<unknown>>();
	readonly t_item = input<TemplateRef<unknown>>();
	readonly t_search = input<TemplateRef<unknown>>();

	/** Virtual Form */
	readonly formId = input<string | null>(null);
	readonly formKey = input<string | null>(null);

	/** Two-way model (single source of truth) */
	readonly wModel = model<SelectValue>(null, { alias: 'wModel' });

	/** Back-compat event */
	readonly wChange = output<SelectValue>();

	/* ===== Internal state ===== */
	private readonly _core = inject(CoreService);
	private readonly _vform = inject(VirtualFormService);

	/** quick id->label map for header rendering */
	readonly allItem: Record<SelectId, string> = {};

	/** signals array for fast template iteration */
	readonly allItems = signal<Signal<SelectItem>[]>(
		this._core.toSignalsArray<SelectItem>([]),
	);

	/** popup + search */
	readonly showOptions = signal(false);
	readonly search = signal('');

	/** derived helpers */
	readonly isMulti = computed(() => this.multiple());
	private _disabledCva = false;
	readonly isDisabled = computed(() => this.disabled() || this._disabledCva);

	/** normalize selection for render */
	readonly selectedIds = computed<SelectId[]>(() => {
		const v = this.wModel();
		return this.isMulti()
			? Array.isArray(v)
				? (v as SelectId[])
				: []
			: v == null
				? []
				: [v as SelectId];
	});
	readonly selectedId = computed<SelectId | null>(
		() => this.selectedIds()[0] ?? null,
	);

	/* ===== CVA glue ===== */
	private _onChange: (v: any) => void = () => {};
	private _onTouched: () => void = () => {};

	constructor() {
		/* rebuild items mirror on input changes */
		effect(() => {
			const list = this.items();
			this.allItems.update(() =>
				list.map((raw) => {
					const item: SelectItem = {
						name:
							typeof raw === 'object'
								? (raw as any)[this.bindLabel()]
								: (raw as any),
						id:
							typeof raw === 'object'
								? (raw as any)[this.bindValue()]
								: (raw as any),
					};
					this.allItem[item.id] = item.name;
					return this._core.toSignal(item);
				}),
			);

			// sanitize selection when items change
			const ids = new Set(this.allItems().map((s) => s().id));
			const val = this.wModel();

			if (this.isMulti()) {
				const next = (Array.isArray(val) ? val : []).filter((id) =>
					ids.has(id as SelectId),
				) as SelectId[];
				if (JSON.stringify(next) !== JSON.stringify(val))
					this.wModel.set(next);
			} else {
				if (val != null && !ids.has(val as SelectId))
					this.wModel.set(null);
			}
		});

		/* Virtual Form <-> wModel sync (with guard) */
		let syncing = false;

		// pull from VF → wModel
		effect(() => {
			const id = this.formId();
			const key = this.formKey();
			if (!id || !key) return;

			this._vform.registerField(id, key, null, []);

			const vfVal = this._vform.getValues(id)[key] ?? null;
			if (!syncing && !this._equal(vfVal, this.wModel())) {
				syncing = true;
				this.wModel.set(vfVal as SelectValue);
				syncing = false;
			}
		});

		// push wModel → VF
		effect(() => {
			const id = this.formId();
			const key = this.formKey();
			if (!id || !key) return;

			const val = this.wModel();
			if (!syncing && !this._equal(this._vform.getValues(id)[key], val)) {
				syncing = true;
				this._vform.setValue(id, key, val ?? null); // ensure no undefined
				syncing = false;
			}
		});

		/* propagate to CVA + legacy output */
		effect(() => {
			const v = this.wModel();
			this._onChange(v);
			this.wChange.emit(v);
		});
	}

	/* ===== UI actions ===== */
	toggleOptions(show = !this.showOptions()) {
		if (!this.isDisabled()) this.showOptions.set(show);
	}

	selectOption(item: SelectItem): void {
		if (this.isMulti()) {
			const set = new Set(this.selectedIds());
			set.has(item.id) ? set.delete(item.id) : set.add(item.id);
			this.wModel.set([...set]); // SelectId[] fits SelectValue now
		} else {
			this.wModel.set(item.id);
			this.showOptions.set(false);
		}
		this._onTouched();
	}

	removeItem(index: number) {
		if (!this.isMulti()) return;
		const arr = [...this.selectedIds()];
		arr.splice(index, 1);
		this.wModel.set(arr);
	}

	clear(): void {
		this.wModel.set(this.isMulti() ? [] : null);
	}

	/* ===== CVA ===== */
	writeValue(obj: SelectValue): void {
		if (!this._equal(this.wModel(), obj)) this.wModel.set(obj);
	}
	registerOnChange(fn: any): void {
		this._onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this._onTouched = fn;
	}
	setDisabledState(isDisabled: boolean): void {
		this._disabledCva = isDisabled;
	}

	/* ===== Utils ===== */
	private _equal(a: any, b: any) {
		return Array.isArray(a) || Array.isArray(b)
			? JSON.stringify(a) === JSON.stringify(b)
			: a === b;
	}
}
