import {
	afterNextRender,
	Directive,
	effect,
	ElementRef,
	inject,
	input,
	signal,
	WritableSignal,
} from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Directive({
	selector: '[translate]',
	standalone: true,
})
export class TranslateDirective {
	/** Optional explicit key. If empty, uses element's initial textContent. */
	readonly translate = input<string>('');

	private readonly _el = inject(ElementRef<HTMLElement>);
	private readonly _translateService = inject(TranslateService);

	private readonly _original = signal<string>(''); // set after render

	private _lastKey = '';
	private _lastSignal: WritableSignal<string> = signal('');

	constructor() {
		// capture origin text once the element content is actually rendered
		afterNextRender(() => {
			const text = (this._el.nativeElement.textContent ?? '').trim();
			this._original.set(text);
		});

		effect(() => {
			const origin = this._original().trim();
			const explicit = (this.translate() || '').trim();

			// If no explicit key and origin is still empty, don't overwrite DOM.
			// This prevents blanking the content.
			const key = (explicit || origin).trim();
			if (!key) return;

			// Only swap signal when key changes
			if (key !== this._lastKey) {
				this._lastKey = key;
				this._lastSignal = this._translateService.translate(key);
			}

			// If no translation exists, service returns key (origin), so this keeps origin text.
			this._el.nativeElement.textContent = this._lastSignal();
		});
	}
}
