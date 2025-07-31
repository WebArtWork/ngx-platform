import { inject, Injectable, signal } from '@angular/core';
import { CrudService, StoreService } from 'wacom';
import { Language } from '../interfaces/language.interface';

@Injectable({
	providedIn: 'root'
})
export class LanguageService extends CrudService<Language> {
	language = signal<Language>({} as Language);

	languages = signal<Language[]>(this.getDocs());

	constructor() {
		super({
			name: 'translatelanguage'
		});

		this._storeService.getJson('language', (language) => {
			if (language) {
				this.setLanguage(language);
			}
		});

		this.get().subscribe(() => {
			this.languages.set(this.getDocs());
		});
	}

	setLanguage(language: Language) {
		this.language.set(language);

		this._storeService.setJson('language', language);
	}

	private _storeService = inject(StoreService);
}
