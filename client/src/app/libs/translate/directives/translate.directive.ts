import { Directive, ElementRef, effect, inject, input } from '@angular/core';
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

	private readonly _original = (
		this._el.nativeElement.textContent ?? ''
	).trim();

	private _lastKey = '';
	private _lastSignal = this._translateService.translate(this._original);

	constructor() {
		effect(() => {
			const key = (this.translate() || this._original).trim();

			// Only swap signal when key changes
			if (key !== this._lastKey) {
				this._lastKey = key;
				this._lastSignal = this._translateService.translate(key);
			}

			this._el.nativeElement.textContent = this._lastSignal();
		});
	}
}
