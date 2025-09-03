import { inject, Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Phrase } from '../interfaces/phrase.interface';
import { Translate } from '../interfaces/translate.interface';
import { LanguageService } from './language.service';
import { PhraseService } from './phrase.service';

@Injectable({
	providedIn: 'root',
})
export class TranslateService extends CrudService<Translate> {
	constructor() {
		super({
			name: 'translate',
			unauthorized: true,
			replace: (doc) => {
				doc.slug = doc.phrase + doc.language;
			},
		});

		this._phraseService.loaded.subscribe(() => {
			this._phrasesInitialized = true;
		});

		this._phraseService.filteredDocuments(this._phrases, {
			field: 'text',
			filtered: this._reTranslate.bind(this),
		});

		this.filteredDocuments(this._translates, {
			field: 'slug',
			filtered: this._reTranslate.bind(this),
		});

		this.get();
	}

	translate(text: string, reset?: (translate: string) => void) {
		if (!text) return '';

		this._resets[text] ||= [];

		if (reset) {
			this._resets[text].push(reset);
		}

		if (!this._phrases[text]?.length) {
			if (this._phrasesInitialized) {
				this._phraseService.create({ text });
			}

			return text;
		}

		const slug =
			this._phrases[text][0]._id ??
			'' + this._languageService.language()._id;

		return this._translates[slug]?.length
			? this._translates[slug][0].text || text
			: text;
	}

	private _resets: Record<string, ((translate: string) => void)[]> = {};

	private _phraseService = inject(PhraseService);

	private _languageService = inject(LanguageService);

	private _phrases: Record<string, Phrase[]> = {};

	private _translates: Record<string, Translate[]> = {};

	private _reTranslate() {
		for (const phrase in this._resets) {
			this._resets[phrase] ||= [];

			for (const callback of this._resets[phrase]) {
				callback(this.translate(phrase));
			}
		}
	}

	private _phrasesInitialized = false;
}
