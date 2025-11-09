import { NgTemplateOutlet } from '@angular/common';
import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	ContentChildren,
	EventEmitter,
	inject,
	input,
	Input,
	OnInit,
	Output,
	QueryList,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from 'wacom';
import { TranslateDirective } from '../../modules/translate/directives/translate.directive';
import { SearchPipe } from '../../search.pipe';
import { ButtonComponent } from '../button/button.component';
import { PerPagePipe } from './per-page.pipe';
import {
	ActionsDirective,
	CellDirective,
	CustomEditDirective,
	SortDirective,
} from './table.directive';

@Component({
	selector: 'wtable',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	imports: [
		FormsModule,
		ButtonComponent,
		TranslateDirective,
		NgTemplateOutlet,
		RouterLink,
		SearchPipe,
		PerPagePipe,
	],
})
export class TableComponent implements OnInit, AfterContentInit {
	private readonly _router = inject(Router);
	private readonly _storeService = inject(StoreService);

	readonly bindValue = input('_id');
	readonly rows = input<unknown[]>([]);

	tableId =
		'table_' +
		this._router.url
			.split('/')
			.filter((p) => p && p.length !== 24)
			.join('/');

	@Input() config: any = {};
	@Input() columns: any = [];
	@Input() value = '_id';
	@Input() title = '';

	@ContentChildren(CellDirective) cell: QueryList<CellDirective>;
	@ContentChildren(SortDirective) sortHeaders: QueryList<SortDirective>;
	@ContentChild(ActionsDirective, { static: false }) action: any;
	@ContentChild(CustomEditDirective, { static: false }) editForm: any;

	now = Date.now();
	searchShow = false;
	searching_text = '';
	filter_filter = '';
	@Output() onSearch = new EventEmitter();
	private _search_timeout: any;

	custom_cell: Record<string, any> = {};
	sort_type: any = {};
	sortable: Record<string, boolean> = {};

	ngOnInit(): void {
		this.default_config();

		for (let i = 0; i < this.columns.length; i++) {
			if (typeof this.columns[i] === 'string') {
				this.columns[i] = {
					title: this.columns[i],
					field: this.columns[i],
				};
			}
		}

		this._storeService.get(this.tableId + 'perPage', (perPage) => {
			if (perPage) this.changePerPage(Number(perPage));
		});
	}

	default_config(): void {
		if (!this.config.pageSizeOptions)
			this.config.pageSizeOptions = [1, 10, 20, 50];
		if (this.config.perPage === undefined) this.config.perPage = -1;
		if (!this.config.page) this.config.page = 1;
		if (!this.config.searchable) this.config.searchable = false;
		if (typeof this.config.allDocs !== 'boolean')
			this.config.allDocs = true;
	}

	ngAfterContentInit(): void {
		for (const dir of this.sortHeaders.toArray())
			this.sortable[dir.cell] = true;
		for (const c of this.cell.toArray())
			this.custom_cell[c.cell] = c.template;
	}

	refresh() {
		this.now = Date.now();
	}

	searching() {
		setTimeout(() => {
			if (!this.config.globalSearch)
				this.filter_filter = this.searching_text;
		}, 100);
		clearTimeout(this._search_timeout);
		this._search_timeout = setTimeout(this.searching.bind(this), 2000);
	}

	search() {
		clearTimeout(this._search_timeout);
		setTimeout(() => {
			if (!this.config.globalSearch)
				this.filter_filter = this.searching_text;
			this.refresh();
		}, 100);
		this.onSearch.emit(this.searching_text);
	}

	select_page_size = false;

	next(): void {
		if (
			typeof this.config.paginate === 'function' ||
			(this.rows &&
				this.config.page * this.config.perPage < this.rows().length)
		) {
			this.config.page += 1;
		}
		if (typeof this.config.paginate === 'function') {
			this.config.paginate(this.config.page);
		}
		this.refresh();
	}

	previous(): void {
		if (this.config.page > 1) {
			this.config.page -= 1;
			if (typeof this.config.paginate === 'function') {
				this.config.paginate(this.config.page);
			}
			this.refresh();
		}
	}

	changePerPage(row: number): void {
		this.config.perPage = row;
		if (typeof this.config.setPerPage === 'function')
			this.config.setPerPage(this.config.perPage);
		this.config.page = 1;
		if (typeof this.config.paginate === 'function')
			this.config.paginate(this.config.page);
		this._storeService.set(this.tableId + 'perPage', row.toString());
		if (
			this.rows &&
			(this.config.page - 1) * this.config.perPage > this.rows().length
		)
			this.lastPage();
		this.select_page_size = false;
		this.refresh();
	}

	lastPage(): void {
		this.config.page = Math.ceil(this.rows().length / this.config.perPage);
	}

	isLast(): boolean {
		return (
			!!this.rows &&
			this.config.page ===
				Math.ceil(this.rows().length / this.config.perPage)
		);
	}

	sort(column: any): void {
		if (this.sort_type.title !== column.field) this.sort_type = {};
		if (this.sortable[column.field]) {
			this.sort_type = {
				title: column.field,
				direction:
					(typeof this.sort_type.direction !== 'string' && 'asc') ||
					(this.sort_type.direction === 'asc' && 'desc') ||
					undefined,
			};
		}
	}
}
