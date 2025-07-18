import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Phrase } from '../interfaces/phrase.interface';

@Injectable({
	providedIn: 'root'
})
export class PhraseService extends CrudService<Phrase> {
	constructor() {
		super({
			name: 'translatephrase'
		});
	}
}
