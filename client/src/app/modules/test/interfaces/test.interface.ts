import { CrudDocument } from 'wacom';

export interface Test extends CrudDocument {
	name: string;
	description: string;
}
