import { inject, Injectable } from '@angular/core';
import { CrudService, StoreService } from 'wacom';
import { Phrase } from '../interfaces/phrase.interface';

@Injectable({
	providedIn: 'root',
})
export class PhraseService extends CrudService<Phrase> {
	constructor() {
		super({
			name: 'translatephrase',
			unauthorized: true,
		});

		this.get();
	}

	storeService = inject(StoreService);
}
