import { Directive, effect, ElementRef, inject, OnInit } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Directive({ selector: '[translate]' })
export class TranslateDirective implements OnInit {
	private _elementRef = inject(ElementRef);

	private _translateService = inject(TranslateService);

	ngOnInit() {
		const originalText = this._elementRef.nativeElement.innerHTML;

		const translated = this._translateService.translate(originalText);

		effect(() => {
			this._elementRef.nativeElement.innerHTML = translated();
		});
	}
}
