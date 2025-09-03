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

		setTimeout(async () => {
			console.log(this.getDocs());

			const docs = await this.storeService.getJson<Phrase[]>(
				'docs_translatephrase',
			);

			console.log(docs);
		});

		setTimeout(() => {
			console.log(this.getDocs());
		}, 1000);

		this.get();
	}

	storeService = inject(StoreService);
}
