import { CrudDocument } from 'wacom';

export interface Language extends CrudDocument {
	name: string;
	description: string;
}
