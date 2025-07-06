import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
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

type Id = string | number;

export interface Item {
	name: string;
	id: Id;
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
export class SelectComponent {
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

	readonly allItem: Record<Id, string> = {};

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
					: (item as Id);

			this.allItem[_item.id] = _item.name;

			return _item;
		})
	);

	/** The selected value(s). */
	readonly value = input<Value>(null);

	activeValue = signal<Id | null>(null);

	activeValues = signal<Id[]>([]);

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

		this.wChange.emit(this.activeValues() as Value);
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

	// above good

	/** Handles click events on items. */
	toggleOption(item: Item): void {
		if (this.multiple()) {
			this.activeValues.set(
				this.activeValues().includes(item.id)
					? this.activeValues().filter((id) => id !== item.id)
					: [...this.activeValues(), item.id]
			);

			this.wChange.emit(this.activeValues() as Value);
		} else {
			this.activeValue.set(item.id);

			this.wChange.emit(this.activeValue());
		}
	}

	/** Custom template for the view (header) of the select input. */
	@Input('view') t_view: TemplateRef<any>;

	/** Custom template for each item in the dropdown. */
	@Input('item') t_item: TemplateRef<any>;

	/** Custom template for the search input. */
	@Input('search') t_search: TemplateRef<any>;

	@ViewChild('e_search', { static: false }) e_search: ElementRef;
}
