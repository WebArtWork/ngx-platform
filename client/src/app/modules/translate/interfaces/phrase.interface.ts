import { CrudDocument } from 'wacom';

export interface Phrase extends CrudDocument {
	text: string;
}
