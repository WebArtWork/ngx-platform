import { NgTemplateOutlet } from '@angular/common';
import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Signal,
	contentChild,
	contentChildren,
	effect,
	inject,
	input,
	isSignal,
	model,
	output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from 'wacom';
import { SearchPipe } from '../../search.pipe';
import { ButtonComponent } from '../button/button.component';
import { PerPagePipe } from './per-page.pipe';
import {
	ActionsDirective,
	CellDirective,
	CustomEditDirective,
	SortDirective,
	TableHeaderDirective,
} from './table.directive';

@Component({
	selector: 'wtable',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
	imports: [
		FormsModule,
		ButtonComponent,
		NgTemplateOutlet,
		RouterLink,
		SearchPipe,
		PerPagePipe,
	],
})
export class TableComponent implements OnInit, AfterContentInit {
	private readonly _router = inject(Router);
	private readonly _storeService = inject(StoreService);

	// inputs (function-based API)
	readonly bindValue = input<string>('_id');
	readonly rows = input<unknown[]>([]);
	readonly config = input<any>({});
	readonly columns = model<any[]>([]);
	readonly value = input<string>('_id');
	readonly title = input<string>('');

	// outputs
	readonly onSearch = output<string>();

	// projected templates
	private readonly _cellDirs = contentChildren(CellDirective, {
		descendants: true,
	});
	private readonly _sortDirs = contentChildren(SortDirective, {
		descendants: true,
	});
	private readonly _actionDir = contentChild(ActionsDirective);
	private readonly _editFormDir = contentChild(CustomEditDirective);

	headerTpl = contentChild(TableHeaderDirective);

	action?: ActionsDirective;
	editForm?: CustomEditDirective;

	now = Date.now();
	searchShow = false;
	searching_text = '';
	filter_filter = '';
	select_page_size = false;

	custom_cell: Record<string, any> = {};
	sort_type: any = {};
	sortable: Record<string, boolean> = {};

	/** Always plain objects, even if input rows are Signal<T>[] */
	normalizedRows: any[] = [];

	tableId =
		'table_' +
		this._router.url
			.split('/')
			.filter((p) => p && p.length !== 24)
			.join('/');

	private _search_timeout: any;

	constructor() {
		// react to rows() changes and unwrap signals
		effect(() => {
			const raw = this.rows() || [];
			this.normalizedRows = Array.isArray(raw)
				? raw.map((row: any) =>
						isSignal(row) ? (row as Signal<any>)() : row,
					)
				: [];
		});
	}

	ngOnInit(): void {
		this.default_config();

		// normalize string columns => { title, field }
		const cols = this.columns();
		for (let i = 0; i < cols.length; i++) {
			if (typeof cols[i] === 'string') {
				cols[i] = { title: cols[i], field: cols[i] };
			}
		}
		this.columns.set(cols);

		this._storeService.get(this.tableId + 'perPage', (perPage) => {
			if (perPage) this.changePerPage(Number(perPage));
		});
	}

	default_config(): void {
		const cfg = this.config();

		if (!cfg.pageSizeOptions) cfg.pageSizeOptions = [1, 10, 20, 50];
		if (cfg.perPage === undefined) cfg.perPage = -1;
		if (!cfg.page) cfg.page = 1;
		if (!cfg.searchable) cfg.searchable = false;
		if (typeof cfg.allDocs !== 'boolean') cfg.allDocs = true;
	}

	ngAfterContentInit(): void {
		const sortDirs = this._sortDirs();
		for (const dir of sortDirs) this.sortable[dir.sort() as string] = true;

		const cellDirs = this._cellDirs();
		for (const c of cellDirs)
			this.custom_cell[c.cell() as string] = c.template;

		this.action = this._actionDir() ?? undefined;
		this.editForm = this._editFormDir() ?? undefined;
	}

	refresh(): void {
		this.now = Date.now();
	}

	searching(): void {
		setTimeout(() => {
			if (!this.config().globalSearch)
				this.filter_filter = this.searching_text;
		}, 100);

		clearTimeout(this._search_timeout);
		this._search_timeout = setTimeout(this.searching.bind(this), 2000);
	}

	search(): void {
		clearTimeout(this._search_timeout);
		setTimeout(() => {
			if (!this.config().globalSearch)
				this.filter_filter = this.searching_text;
			this.refresh();
		}, 100);
		this.onSearch.emit(this.searching_text);
	}

	next(): void {
		const cfg = this.config();
		const rows = this.normalizedRows;

		if (cfg.perPage === -1) return;

		// client mode – we have all docs in memory
		if (cfg.allDocs || typeof cfg.paginate !== 'function') {
			if (rows && cfg.page * cfg.perPage < rows.length) {
				cfg.page += 1;
				this.refresh();
			}
			return;
		}

		// server mode – delegate to backend
		cfg.page += 1;
		cfg.paginate(cfg.page);
		this.refresh();
	}

	previous(): void {
		const cfg = this.config();

		if (cfg.page <= 1) return;

		cfg.page -= 1;

		// only call backend when we are in server mode
		if (!cfg.allDocs && typeof cfg.paginate === 'function') {
			cfg.paginate(cfg.page);
		}

		this.refresh();
	}

	changePerPage(row: number): void {
		const cfg = this.config();

		cfg.perPage = row;
		cfg.page = 1;

		// server mode: sync per-page + reload page 1
		if (!cfg.allDocs) {
			if (typeof cfg.setPerPage === 'function') {
				cfg.setPerPage(cfg.perPage);
			}
			if (typeof cfg.paginate === 'function') {
				cfg.paginate(cfg.page);
			}
		}

		this._storeService.set(this.tableId + 'perPage', row.toString());

		const rows = this.normalizedRows;
		if (rows && (cfg.page - 1) * cfg.perPage > rows.length) {
			this.lastPage();
		}

		this.select_page_size = false;
		this.refresh();
	}

	lastPage(): void {
		const cfg = this.config();
		const rows = this.normalizedRows;

		if (!rows || !rows.length || cfg.perPage <= 0) return;
		cfg.page = Math.ceil(rows.length / cfg.perPage);
	}

	isLast(): boolean {
		const cfg = this.config();
		const rows = this.normalizedRows;

		if (!rows || !rows.length || cfg.perPage <= 0 || !cfg.allDocs)
			return false;

		return cfg.page >= Math.ceil(rows.length / cfg.perPage);
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
