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
			unauthorized: true,
		});

		this._storeService.get('languageId', (languageId) => {
			if (languageId) {
				this.setLanguageId(languageId);
			}
		});

		this.get().subscribe(() => {
			this.languages.set(this.getDocs());
		});
	}

	setLanguage(language: Language) {
		this.language.set(language);

		this._storeService.setJson('languageId', language._id);
	}

	setLanguageId(languageId: string) {
		const language = this.languages().find(
			(l) => l._id === languageId || l._localId === +languageId,
		);

		if (language) {
			this.setLanguage(language);
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
					? languages[0]
					: languages[index],
			);
		}
	}

	private _storeService = inject(StoreService);
}
