import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	TemplateRef,
	ViewChild,
	inject,
	input,
	signal
} from '@angular/core';
import { CoreService } from 'wacom';
import { InputComponent } from '../input/input.component';
import { TranslateDirective } from '../translate/translate.directive';
import { TranslatePipe } from '../translate/translate.pipe';
import { TranslateService } from '../translate/translate.service';
import { ClickOutsideDirective } from './clickoutside.directive';
import { SearchPipe } from './search.pipe';

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
export class SelectComponent implements OnInit, OnChanges {
	private _core = inject(CoreService);
	private _translate = inject(TranslateService);

	/** Whether the select input is disabled. */
	readonly disabled = input(false);

	/** Whether the select input is clearable. */
	readonly clearable = input(false);

	/** Placeholder text for the select input. */
	readonly placeholder = input<string>();

	/** List of items to display in the dropdown. */
	@Input() items: any = [];

	_items: any = {};

	/** Clears the selected values. */
	clear(): void {
		if (this.multiple) {
			this._values = [];

			this.modelChange.emit(this._values);
		} else {
			this._selected = '';

			this.modelChange.emit('');
		}
	}

	/** The name of the property to display in the dropdown items. */
	@Input() name = 'name';

	/** The property used as the value for each item. */
	@Input() value = '_id';

	/** Whether multiple items can be selected. */
	@Input() multiple = false;

	/** The label for the select input. */
	@Input() label = '';

	/** Whether the dropdown is searchable. */
	@Input() searchable = false;

	/** The property by which to search items. */
	@Input() searchableBy = 'name';

	/** Event emitted when the selected values change. */
	@Output() modelChange = new EventEmitter();

	_values: any = [];

	_names: any = [];

	_selected: string;

	showOptions = signal(false);

	/** The selected value(s). */
	@Input() select: any;

	/** Custom template for the view (header) of the select input. */
	@Input('view') t_view: TemplateRef<any>;

	/** Custom template for each item in the dropdown. */
	@Input('item') t_item: TemplateRef<any>;

	/** Custom template for the search input. */
	@Input('search') t_search: TemplateRef<any>;

	@ViewChild('e_search', { static: false }) e_search: ElementRef;

	search = signal('');

	ngOnInit(): void {
		this._prepareItems();

		this._core.onComplete('translate').then(() => {
			this._prepareItems();
		});
	}

	toggleOptions(showOptions = !this.showOptions()) {
		if (!this.disabled()) {
			this.showOptions.set(showOptions);

			this.focus_search();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (
			(changes['select'] && !changes['select'].firstChange) ||
			changes['items']
		) {
			this._prepareItems();
		}
	}

	/** Handles click events on items. */
	item_onclick(item: any): void {
		if (this.multiple) {
			if (this._values.indexOf(item[this.value]) !== -1) {
				this._values.splice(this._values.indexOf(item[this.value]), 1);
			} else {
				this._values.push(item[this.value]);
			}

			if (this._names.indexOf(item[this.name]) !== -1) {
				this._names.splice(this._names.indexOf(item[this.name]), 1);
			} else {
				this._names.push(item[this.name]);
			}

			this._selected =
				this._names.length == 0
					? this.placeholder
					: this._names.join(', ');

			this.modelChange.emit(this._values);
		} else {
			this._selected = item[this.name];

			this.showOptions.set(false);

			this.modelChange.emit(item[this.value]);
		}
	}

	/** Focuses the search input when the dropdown is opened. */
	focus_search(): void {
		this.search.set('');

		if (!this.searchable || this.t_search) return;

		if (this.e_search) {
			this.e_search.nativeElement.focus();
		} else {
			setTimeout(this.focus_search.bind(this), 100);
		}
	}

	private _prepareItems() {
		for (let i = 0; i < this.items.length; i++) {
			if (typeof this.items[i] === 'string') {
				this.items[i] = {
					name: this.items[i]
				};

				this.items[i][this.value] = this.items[i].name;
			}

			this.items[i].__search = this.searchableBy
				.split(' ')
				.map((field) => {
					return this._translate.translate(
						'Select.' + this.items[i][field] || ''
					);
				})
				.join('');

			this._items[this.items[i][this.value]] = this.items[i];
		}

		if (this.multiple) {
			this._values = (this.select || []).filter((value: any) => {
				return !!this.items.find(
					(item: any) => item[this.value] === value
				);
			});
		} else {
			this._selected = this._items[this.select]
				? this._items[this.select][this.name]
				: this.select;
		}
	}
}
