import { CrudDocument } from 'wacom';

export interface Translate extends CrudDocument {
	name: string;
	description: string;
}
