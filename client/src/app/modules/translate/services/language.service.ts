import { inject, Injectable, signal } from '@angular/core';
import { CrudService, StoreService } from 'wacom';
import { Language } from '../interfaces/language.interface';

@Injectable({
	providedIn: 'root',
})
export class LanguageService extends CrudService<Language> {
	language = signal<Language>({} as Language);

	languages = signal<Language[]>(this.getDocs());

	constructor() {
		super({
			name: 'translatelanguage',
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

	setLanguage(_id: string) {
		const language = this.languages().find((l) => l._id === _id);

		if (language) {
			this.language.set(language);

			this._storeService.setJson('language', language._id);
		}
	}

	nextLanguage() {
		const languages = this.languages();

		if (languages.length > 1) {
			const language = this.language();

			const index = languages.findIndex((_language) => {
				return _language._id === language._id;
			});

			this.setLanguage(
				index === languages.length - 1
					? languages[0]._id
					: languages[index]._id,
			);
		}
	}

	private _storeService = inject(StoreService);
}
