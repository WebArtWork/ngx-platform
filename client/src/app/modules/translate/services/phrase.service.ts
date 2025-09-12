import { Injectable, signal } from '@angular/core';
import { CrudService } from 'wacom';
import { Phrase } from '../interfaces/phrase.interface';

@Injectable({
	providedIn: 'root',
})
export class PhraseService extends CrudService<Phrase> {
	phrases = signal<Phrase[]>(this.getDocs());

	constructor() {
		super({
			name: 'translatephrase',
			unauthorized: true,
		});

		this.loaded.subscribe({
			next: () => {
				this.phrases.set(this.getDocs());
			},
		});

		this.get().subscribe(() => {
			this.phrases.set(this.getDocs());
		});
	}
}
