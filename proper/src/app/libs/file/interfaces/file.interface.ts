import { CrudDocument } from 'wacom';

export interface File extends CrudDocument<File> {
	name: string;
	description: string;
}
