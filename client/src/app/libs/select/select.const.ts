import { SelectButton } from './select.interface';

export const selectDefaults = {
	disabled: false,
	clearable: false,
	placeholder: '',
	multiple: false,
	bindLabel: 'name',
	bindValue: '_id',
	label: '',
	searchable: false,
	searchableBy: 'name',
	items: [] as unknown[],
	buttons: [] as SelectButton[],
	formId: null as string | null,
	formKey: null as string | null,
};
