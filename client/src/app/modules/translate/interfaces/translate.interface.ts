import { CrudDocument } from 'wacom';

export interface Translate extends CrudDocument<Translate> {
	name: string;
	description: string;
}
