import { NgTemplateOutlet } from '@angular/common';
import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	contentChild,
	contentChildren,
	inject,
	input,
	model,
	output,
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
	TableHeaderDirective,
} from './table.directive';

@Component({
	selector: 'wtable',
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

	// existing inputs, function-based API
	readonly bindValue = input<string>('_id');
	readonly rows = input<unknown[]>([]);
	readonly config = input<any>({});
	readonly columns = model<any[]>([]);
	readonly value = input<string>('_id');
	readonly title = input<string>('');

	// extra optional header input (TemplateRef passed from parent)
	readonly t_header = input<TemplateRef<unknown> | null>(null);

	// outputs (same name)
	readonly onSearch = output<string>();

	// content queries (same semantics)
	private readonly _cellDirs = contentChildren(CellDirective);
	private readonly _sortDirs = contentChildren(SortDirective);
	private readonly _actionDir = contentChild(ActionsDirective);
	private readonly _editFormDir = contentChild(CustomEditDirective);
	private readonly _headerDir = contentChild(TableHeaderDirective);
	headerTpl = contentChild(TableHeaderDirective);

	// used in template (not inputs)
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

	tableId =
		'table_' +
		this._router.url
			.split('/')
			.filter((p) => p && p.length !== 24)
			.join('/');

	private _search_timeout: any;

	ngOnInit(): void {
		this.default_config();

		// keep original "string column" handling but work off the input signal
		const cols = this.columns();
		for (let i = 0; i < cols.length; i++) {
			if (typeof cols[i] === 'string') {
				cols[i] = { title: cols[i], field: cols[i] };
			}
		}
		// write back to the signal so template sees objects
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
		for (const dir of sortDirs) this.sortable[dir.cell() as string] = true;

		const cellDirs = this._cellDirs();
		for (const c of cellDirs)
			this.custom_cell[c.cell() as string] = c.template;

		this.action = this._actionDir() ?? undefined;
		this.editForm = this._editFormDir() ?? undefined;

		// prefer input t_header if provided, otherwise use <ng-template tableHeader>
		// this.headerTpl = this.t_header() ?? this._headerDir()?.template ?? null;
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
		const rows = this.rows();

		if (
			typeof cfg.paginate === 'function' ||
			(rows && cfg.page * cfg.perPage < rows.length)
		) {
			cfg.page += 1;
		}

		if (typeof cfg.paginate === 'function') {
			cfg.paginate(cfg.page);
		}
		this.refresh();
	}

	previous(): void {
		const cfg = this.config();

		if (cfg.page > 1) {
			cfg.page -= 1;

			if (typeof cfg.paginate === 'function') {
				cfg.paginate(cfg.page);
			}
			this.refresh();
		}
	}

	changePerPage(row: number): void {
		const cfg = this.config();

		cfg.perPage = row;

		if (typeof cfg.setPerPage === 'function') cfg.setPerPage(cfg.perPage);

		cfg.page = 1;

		if (typeof cfg.paginate === 'function') cfg.paginate(cfg.page);

		this._storeService.set(this.tableId + 'perPage', row.toString());

		const rows = this.rows();
		if (rows && (cfg.page - 1) * cfg.perPage > rows.length) {
			this.lastPage();
		}

		this.select_page_size = false;
		this.refresh();
	}

	lastPage(): void {
		const cfg = this.config();
		const rows = this.rows();
		cfg.page = Math.ceil(rows.length / cfg.perPage);
	}

	isLast(): boolean {
		const cfg = this.config();
		const rows = this.rows();

		return !!rows && cfg.page === Math.ceil(rows.length / cfg.perPage);
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
