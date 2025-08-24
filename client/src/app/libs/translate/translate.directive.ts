import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { TranslateService } from './translate.service';

@Directive({ selector: '[translate]' })
export class TranslateDirective implements OnInit {
	/**
	 * On initialization, this directive replaces the innerHTML of the element
	 * with the translated version of the text.
	 */
	ngOnInit() {
		this._elementRef.nativeElement.innerHTML =
			this._translateService.translate(
				this._elementRef.nativeElement.innerHTML,
				(translate: string) => {
					this._elementRef.nativeElement.innerHTML = translate;
				},
			);
	}

	private _elementRef = inject(ElementRef);

	private _translateService = inject(TranslateService);
}
