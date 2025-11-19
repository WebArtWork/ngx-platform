import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Signal,
	TemplateRef,
	computed,
	contentChild,
	effect,
	forwardRef,
	inject,
	input,
	model,
	output,
	signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VirtualFormService } from 'src/app/virtual-form.service';
import { ClickOutsideDirective, CoreService, SearchPipe } from 'wacom';
import { TranslateDirective } from '../../modules/translate/directives/translate.directive';
import { TranslatePipe } from '../../modules/translate/pipes/translate.pipe';
import { InputComponent } from '../input/input.component';
import {
	WselectItemDirective,
	WselectSearchDirective,
	WselectViewDirective,
} from './select.directives';
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

	/* ==== Projected templates (contentChild) ==== */
	readonly viewTpl = contentChild(WselectViewDirective, {
		read: TemplateRef<unknown>,
	});
	readonly itemTpl = contentChild(WselectItemDirective, {
		read: TemplateRef<unknown>,
	});
	readonly searchTpl = contentChild(WselectSearchDirective, {
		read: TemplateRef<unknown>,
	});

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
		/* rebuild items mirror on input changes (supports plain items & signals) */
		effect(() => {
			const list = this.items();
			const bindLabel = this.bindLabel();
			const bindValue = this.bindValue();
			const searchBy = this.searchableBy();

			// reset id->label map
			for (const key of Object.keys(this.allItem)) {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete (this.allItem as any)[key];
			}

			const normalized: SelectItem[] = list.map((raw) => {
				// unwrap Angular signal if passed
				let value: any = raw;
				if (typeof raw === 'function') {
					try {
						value = (raw as any)();
					} catch {
						value = raw;
					}
				}

				let id: SelectId;
				let name: string;

				if (
					typeof value === 'string' ||
					typeof value === 'number' ||
					typeof value === 'boolean'
				) {
					id = value as SelectId;
					name = String(value);
				} else if (value && typeof value === 'object') {
					const v: any = value;
					id = (v[bindValue] ?? v._id) as SelectId;
					name = (v[bindLabel] ??
						v.name ??
						v.title ??
						String(id)) as string;
				} else {
					id = String(value) as SelectId;
					name = String(value);
				}

				// build __search field from requested paths
				let searchValue = name;
				if (value && typeof value === 'object' && searchBy) {
					const fields = searchBy.split(/\s+/).filter(Boolean);
					const tokens: string[] = [];
					for (const f of fields) {
						const token = (value as any)[f];
						if (token != null) tokens.push(String(token));
					}
					if (tokens.length) searchValue = tokens.join(' ');
				}

				const item: SelectItem = {
					id,
					name,
					__search: searchValue,
				};

				this.allItem[id] = name;
				return item;
			});

			this.allItems.set(
				this._core.toSignalsArray<SelectItem>(normalized),
			);

			// sanitize selection when items change
			const ids = new Set(this.allItems().map((s) => s().id));
			const val = this.wModel();

			if (this.isMulti()) {
				const next = (Array.isArray(val) ? val : []).filter((id) =>
					ids.has(id as SelectId),
				) as SelectId[];
				if (JSON.stringify(next) !== JSON.stringify(val)) {
					this.wModel.set(next);
				}
			} else {
				if (
					!val ||
					(this.allItems().length && !ids.has(val as SelectId))
				) {
					this.wModel.set(null);
				}
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
				this._vform.setValue(id, key, val ?? null);
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
			this.wModel.set([...set]);
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
