import { FormComponentInterface } from './component.interface';

export interface FormInterface {
	formId?: string; // developer id, usually name of where that form will be used
	_id?: string; // mongodb id, will be null where form will be inside the code
	appId?: string;
	title?: string;
	class?: string;
	active?: boolean;
	components: FormComponentInterface[];
}
