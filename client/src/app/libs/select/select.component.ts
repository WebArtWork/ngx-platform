import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnInit,
	TemplateRef,
	ViewChild,
	computed,
	effect,
	input,
	output,
	signal
} from '@angular/core';
import { InputComponent } from '../input/input.component';
import { TranslateDirective } from '../translate/translate.directive';
import { TranslatePipe } from '../translate/translate.pipe';
import { ClickOutsideDirective } from './clickoutside.directive';
import { SearchPipe } from './search.pipe';

export type Value =
	| null
	| string
	| number
	| boolean
	| string[]
	| number[]
	| boolean[];

export interface Item {
	name: string;
	id: string | number;
}

/**
 * The SelectComponent is a customizable select dropdown component that supports
 * single or multiple selections, search, and custom templates for both the view
 * and items.
 */
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgTemplateOutlet,
		SearchPipe,
		TranslateDirective,
		TranslatePipe,
		InputComponent,
		ClickOutsideDirective
	],
	selector: 'wselect',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
	/** Whether the select input is disabled. */
	readonly disabled = input(false);

	/** Whether the select input is clearable. */
	readonly clearable = input(false);

	/** Placeholder text for the select input. */
	readonly placeholder = input('');

	/** Whether multiple items can be selected. */
	readonly multiple = input(false);

	/** The name of the property to display in the dropdown items. */
	readonly bindLabel = input('name');

	/** The property used as the value for each item. */
	readonly bindValue = input('_id');

	/** The value type used */
	readonly valueType = input<'string' | 'number' | 'boolean' | 'null'>(
		'string'
	);

	/** The label for the select input. */
	readonly label = input('');

	/** Whether the dropdown is searchable. */
	readonly searchable = input(false);

	/** The property by which to search items. */
	readonly searchableBy = input('name');

	/** List of items to display in the dropdown. */
	readonly items = input<unknown[]>([]);

	/** Event emitted when the selected value/values change. */
	readonly wChange = output<Value>();

	readonly allItem: Record<string | number, string> = {};

	readonly allItems = computed<Item[]>(() =>
		this.items().map((item) => {
			const _item: Item = {} as Item;

			_item.name =
				typeof item === 'object'
					? (item as Record<string, string>)[this.bindLabel()]
					: (item as string);

			_item.id =
				typeof item === 'object'
					? (item as Record<string, string>)[this.bindValue()]
					: (item as string | number);

			this.allItem[_item.id] = _item.name;

			return _item;
		})
	);

	/** The selected value(s). */
	readonly value = input<Value>(null);

	activeValue = signal<string | number | null>(null);

	activeValues = signal<string[] | number[]>([]);

	search = signal('');

	showOptions = signal(false);

	constructor() {
		effect(() => {
			if (
				this.multiple() &&
				JSON.stringify(this.activeValue()) !==
					JSON.stringify(this.value())
			) {
				this.activeValues.set(this.value() as string[] | number[]);
			} else if (
				!this.multiple() &&
				this.activeValue() !== this.value()
			) {
				this.activeValue.set(this.value() as string | number);
			}
		});
	}

	removeItem(index: number) {
		this.activeValues.set(this.activeValues().splice(index, 1));

		this.wChange.emit(this.activeValues());
	}

	/** Clears the selected values. */
	clear(): void {
		if (this.multiple()) {
			this.activeValues.set([]);

			this.wChange.emit([]);
		} else {
			this.activeValue.set('');

			this.wChange.emit('');
		}
	}

	toggleOptions(showOptions = !this.showOptions()) {
		if (!this.disabled()) {
			this.showOptions.set(showOptions);
		}
	}

	/** Handles click events on items. */
	clicked(item: any): void {
		// if (this.multiple()) {
		// 	if (this._values.indexOf(item[this.value()]) !== -1) {
		// 		this._values.splice(
		// 			this._values.indexOf(item[this.value()]),
		// 			1
		// 		);
		// 	} else {
		// 		this._values.push(item[this.value()]);
		// 	}
		// 	if (this._names.indexOf(item[this.name()]) !== -1) {
		// 		this._names.splice(this._names.indexOf(item[this.name()]), 1);
		// 	} else {
		// 		this._names.push(item[this.name()]);
		// 	}
		// 	this._selected =
		// 		this._names.length == 0
		// 			? this.placeholder
		// 			: this._names.join(', ');
		// 	this.modelChange.emit(this._values);
		// } else {
		// 	this._selected = item[this.name()];
		// 	this.showOptions.set(false);
		// 	this.modelChange.emit(item[this.value()]);
		// }
	}

	// above good

	/** Custom template for the view (header) of the select input. */
	@Input('view') t_view: TemplateRef<any>;

	/** Custom template for each item in the dropdown. */
	@Input('item') t_item: TemplateRef<any>;

	/** Custom template for the search input. */
	@Input('search') t_search: TemplateRef<any>;

	@ViewChild('e_search', { static: false }) e_search: ElementRef;

	_values: any = [];

	_names: any = [];

	_selected: string;
}
