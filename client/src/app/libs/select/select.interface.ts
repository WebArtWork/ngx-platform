import { SelectId } from './select.type';

export interface SelectItem {
	name: string;
	id: SelectId;
}

export interface SelectButton {
	icon?: string;
	text?: string;
	click?: (doc: Document) => void;
	class?: string;
}
