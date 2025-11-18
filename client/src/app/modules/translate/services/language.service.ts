import { effect, inject, Injectable, signal } from '@angular/core';
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

		this.loaded.subscribe({
			next: () => {
				this.languages.set(this.getDocs());

				this._loadLocal();
			},
		});

		this.get().subscribe(() => {
			this.languages.set(this.getDocs());

			this._loadLocal();
		});

		// derive `language` from `_languageId` + `languages`
		effect(() => {
			const id = this._languageId();

			const list = this.languages();

			if (!id || !list.length) {
				return;
			}

			const lang = list.find((l) => l._id === id);

			if (!lang) {
				return; // guard: unknown / not yet loaded id
			}

			// only valid language reaches here
			this.language.set(lang);

			this._storeService.set('languageId', id);
			this._emitterService.emit('languageId', id);
		});
	}

	setLanguageId(languageId: string) {
		this._languageId.set(languageId);
	}

	setLanguage(language: Language) {
		if (language._id) {
			this._languageId.set(language._id);
		}
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
		} else {
			this._languageId.set(null);
		}
	}

	private _loadLocal() {
		this._storeService.get('languageId', (languageId) => {
			if (languageId) {
				this._languageId.set(languageId);
			}
		});
	}

	private _storeService = inject(StoreService);

	private _emitterService = inject(EmitterService);

	private _languageId = signal<string | null>(null);
}
