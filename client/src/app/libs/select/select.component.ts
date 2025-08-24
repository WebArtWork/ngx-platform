import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Signal,
	TemplateRef,
	effect,
	inject,
	input,
	output,
	signal,
} from '@angular/core';
import { CoreService } from 'wacom';
import { InputComponent } from '../input/input.component';
import { TranslateDirective } from '../translate/translate.directive';
import { TranslatePipe } from '../translate/translate.pipe';
import { ClickOutsideDirective } from './clickoutside.directive';
import { SearchPipe } from './search.pipe';
import { SelectItem } from './select.interface';
import { SelectId, SelectValue } from './select.type';

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
		ClickOutsideDirective,
	],
	selector: 'wselect',
	templateUrl: './select.component.html',
	styleUrl: './select.component.scss',
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
		'string',
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
	readonly wChange = output<SelectValue>();

	/** Custom template for the view (header) of the select input. */
	readonly t_view = input<TemplateRef<unknown>>();

	/** Custom template for each item in the dropdown. */
	readonly t_item = input<TemplateRef<unknown>>();

	/** Custom template for the search input. */
	readonly t_search = input<TemplateRef<unknown>>();

	readonly allItem: Record<SelectId, string> = {};

	private _core = inject(CoreService);

	readonly allItems = signal<Signal<SelectItem>[]>(
		this._core.toSignalsArray<SelectItem>([]),
	);

	/** The selected value(s). */
	readonly value = input<SelectValue>(null);

	activeValue = signal<SelectId | null>(null);

	test = signal<SelectId | null>(null);

	activeValues = signal<SelectId[]>([]);

	search = signal('');

	showOptions = signal(false);

	constructor() {
		let initialized = false;

		effect(() => {
			this.allItems.update(() =>
				this.items().map((item) => {
					const saveItem: SelectItem = {} as SelectItem;

					const inputItem = (item as () => unknown)();

					saveItem.name =
						typeof inputItem === 'object'
							? (inputItem as Record<string, string>)[
									this.bindLabel()
								]
							: (inputItem as string);

					saveItem.id =
						typeof inputItem === 'object'
							? (inputItem as Record<string, string>)[
									this.bindValue()
								]
							: (inputItem as SelectId);

					this.allItem[saveItem.id] = saveItem.name;

					return this._core.toSignal(saveItem);
				}),
			);

			if (!initialized) {
				initialized = true;

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
			}
		});
	}

	removeItem(index: number) {
		this.activeValues.set(this.activeValues().splice(index, 1));

		this.wChange.emit(this.activeValues() as SelectValue);
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

	selectOption(item: SelectItem): void {
		if (this.multiple()) {
			this.activeValues.set(
				this.activeValues().includes(item.id)
					? this.activeValues().filter((id) => id !== item.id)
					: [...this.activeValues(), item.id],
			);

			this.wChange.emit(this.activeValues() as SelectValue);
		} else {
			this.activeValue.set(item.id);

			console.log(item.id, this.activeValue());

			this.wChange.emit(this.activeValue());

			this.showOptions.set(false);
		}
	}
}
