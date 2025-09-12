import { inject, Injectable, signal } from '@angular/core';
import { CrudService, EmitterService, StoreService } from 'wacom';
import { Language } from '../interfaces/language.interface';

@Injectable({
	providedIn: 'root',
})
export class LanguageService extends CrudService<Language> {
	language = signal<Language | undefined>(undefined);

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

		this.loaded.subscribe({
			next: () => {
				this.languages.set(this.getDocs());
			},
		});

		this.get().subscribe(() => {
			this.languages.set(this.getDocs());
		});
	}

	setLanguage(language: Language) {
		this.setLanguageId(language._id as string);
	}

	setLanguageId(languageId: string) {
		this.language = this.getSignal(languageId);

		this._storeService.setJson('languageId', languageId);

		this._emitterService.emit('languageId', languageId);
	}

	nextLanguage() {
		const languages = this.languages();

		if (languages.length > 1) {
			const language = this.language();

			const index = language
				? languages.findIndex((_language) => {
						return _language._id === language._id;
					})
				: 0;

			this.setLanguage(
				index === languages.length - 1
					? languages[0]
					: languages[index],
			);
		}
	}

	private _storeService = inject(StoreService);

	private _emitterService = inject(EmitterService);
}
