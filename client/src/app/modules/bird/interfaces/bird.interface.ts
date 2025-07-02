import { CrudDocument } from 'wacom';

export interface Bird extends CrudDocument {
	name: string;
	description: string;
}
