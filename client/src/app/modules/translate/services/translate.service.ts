import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CrudService, EmitterService } from 'wacom';
import { Phrase } from '../interfaces/phrase.interface';
import { Translate } from '../interfaces/translate.interface';
import { PhraseService } from './phrase.service';

@Injectable({ providedIn: 'root' })
export class TranslateService extends CrudService<Translate> {
	constructor() {
		super({
			name: 'translate',
			unauthorized: true,
			replace: (doc) => {
				doc.slug = doc.phrase + doc.language;
			},
		});

		// 🔁 Instead of calling _reTranslate directly in filtered callbacks,
		//     we schedule a single coalesced recompute to avoid re-entrancy.
		this.filteredDocuments(this._translates, {
			field: 'slug',
			filtered: () => this._scheduleRecalc(),
		});

		this._phraseService.loaded.subscribe(() => {
			this._phrasesInitialized = true;
		});

		this._phraseService.filteredDocuments(this._phrases, {
			field: 'text',
			filtered: () => this._scheduleRecalc(),
		});

		this._emitterService.on('languageId').subscribe((languageId) => {
			this.loadTranslate(languageId as string);
		});
	}

	loadTranslate(languageId: string) {
		if (this._languageId === languageId) return;

		this._languageId = languageId;

		this.get({ query: 'language=' + languageId }).subscribe(() => {
			this._scheduleRecalc();
		});
	}

	translate(text: string): WritableSignal<string> {
		this._signalTranslates[text] ||= signal(this._getTranslation(text));
		return this._signalTranslates[text];
	}

	/* ──────────────────────────────────────────────────────────────────────────
	   Internal
	   ────────────────────────────────────────────────────────────────────────── */

	private _phraseService = inject(PhraseService);
	private _emitterService = inject(EmitterService);

	private _phrases: Record<string, Phrase[]> = {};
	private _translates: Record<string, Translate[]> = {};
	private _signalTranslates: Record<string, WritableSignal<string>> = {};

	private _phrasesInitialized = false;
	private _languageId = '';

	/** microtask coalescing flags */
	private _recalcPending = false;
	private _recalcInProgress = false;

	private _scheduleRecalc(): void {
		if (this._recalcPending) return;
		this._recalcPending = true;
		queueMicrotask(() => {
			this._recalcPending = false;
			this._reTranslateNow();
		});
	}

	private _reTranslateNow(): void {
		// guard against re-entrancy if any downstream observer causes another schedule
		if (this._recalcInProgress) return;
		this._recalcInProgress = true;
		try {
			for (const text of Object.keys(this._signalTranslates)) {
				// If we already have the phrase record, compute translation
				if (this._phrases[text]?.length) {
					const next = this._getTranslation(text);
					if (this._signalTranslates[text]() !== next) {
						// Setting a signal can trigger consumers, but we are guarded by coalescing
						this._signalTranslates[text].set(next);
					}
				} else if (this._phrasesInitialized && this._languageId) {
					// Optionally create missing phrase here (left disabled to avoid write loops):
					// this._phraseService.create({ text });
				}
			}
		} finally {
			this._recalcInProgress = false;
		}
	}

	private _getTranslation(text: string): string {
		if (this._phrases[text]?.length && this._languageId) {
			const slug = this._phrases[text][0]._id + this._languageId;
			if (this._translates[slug]?.length) {
				return this._translates[slug][0].text;
			}
		}
		return text;
	}
}
