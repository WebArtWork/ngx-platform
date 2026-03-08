import { TablesActionVariant } from './tables.types';

export interface TablesColumn {
	key: string;
	label?: string;
}

export interface TablesAction {
	label?: string;
	href?: string;
	variant?: TablesActionVariant;
}

export interface TablesRow {
	cells: Record<string, string | number | undefined>;
	actions?: TablesAction[];
}

export interface TablesContent {
	sectionId?: string;
	title?: string;
	description?: string;
	columns?: TablesColumn[];
	rows?: TablesRow[];
	emptyState?: string;
}
