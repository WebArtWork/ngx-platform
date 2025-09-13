import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CrudService, EmitterService } from 'wacom';
import { Phrase } from '../interfaces/phrase.interface';
import { Translate } from '../interfaces/translate.interface';
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

		this.filteredDocuments(this._translates, {
			field: 'slug',
			filtered: this._reTranslate.bind(this),
		});

		this._phraseService.loaded.subscribe(() => {
			this._phrasesInitialized = true;
		});

		this._phraseService.filteredDocuments(this._phrases, {
			field: 'text',
			filtered: this._reTranslate.bind(this),
		});

		this._emitterService.on('languageId').subscribe((languageId) => {
			this.loadTranslate(languageId as string);
		});
	}

	loadTranslate(languageId: string) {
		if (this._languageId === languageId) {
			return;
		}

		this._languageId = languageId;

		this.get({ query: 'language=' + languageId }).subscribe(
			this._reTranslate.bind(this),
		);
	}

	translate(text: string): WritableSignal<string> {
		this._signalTranslates[text] ||= signal(this._getTranslation(text));

		return this._signalTranslates[text];
	}

	private _phraseService = inject(PhraseService);

	private _emitterService = inject(EmitterService);

	private _phrases: Record<string, Phrase[]> = {};

	private _translates: Record<string, Translate[]> = {};

	private _signalTranslates: Record<string, WritableSignal<string>> = {};

	private _reTranslate() {
		for (const phrase in this._signalTranslates) {
			const translate = this._getTranslation(phrase);

			if (this._signalTranslates[phrase]() !== translate) {
				this._signalTranslates[phrase].set(translate);
			}
		}
	}

	private _getTranslation(text: string) {
		if (this._phrases[text]?.length && this._languageId) {
			const slug = this._phrases[text][0]._id + this._languageId;

			if (this._translates[slug]?.length) {
				return this._translates[slug][0].text;
			}
		} else if (this._phrasesInitialized) {
			this._phraseService.create({ text });
		}

		return text;
	}

	private _phrasesInitialized = false;

	private _languageId = '';
}
