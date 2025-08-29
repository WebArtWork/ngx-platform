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
			replace: (doc) => {
				doc.slug = doc.phrase + doc.language;
			},
		});

		this._phraseService.filteredDocuments(this._phrases, {
			field: 'text',
			filtered: () => {
				console.log('translate', this._phrases);
			},
		});

		this.filteredDocuments(this._translates, {
			field: 'slug',
			filtered: () => {
				console.log('translate', this._phrases);
			},
		});
	}

	translate(text: string, reset?: (translate: string) => void) {
		if (!text) return '';

		this._resets[text] ||= [];

		if (reset) {
			this._resets[text].push(reset);
		}

		if (!this._phrases[text]?.length) {
			this._phraseService.create({ text });

			return text;
		}

		const slug =
			this._phrases[text][0]._id ??
			'' + this._languageService.language()._id;

		console.log(
			slug,
			this._translates[slug].length
				? this._translates[slug][0].text || text
				: text,
		);

		return this._translates[slug].length
			? this._translates[slug][0].text || text
			: text;
	}

	private _resets: Record<string, ((translate: string) => void)[]> = {};

	private _phraseService = inject(PhraseService);

	private _languageService = inject(LanguageService);

	private _phrases: Record<string, Phrase[]> = {};

	private _translates: Record<string, Translate[]> = {};
}
