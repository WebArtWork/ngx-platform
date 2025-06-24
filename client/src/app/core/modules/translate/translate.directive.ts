import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';

@Directive({ selector: '[translate]' })
export class TranslateDirective implements OnInit {
	elementRef = inject(ElementRef);
	private tr = inject(TranslateService);

	/**
	 * On initialization, this directive replaces the innerHTML of the element
	 * with the translated version of the text.
	 */
	ngOnInit() {
		this.elementRef.nativeElement.innerHTML = this.tr.translate(
			this.elementRef.nativeElement.innerHTML,
			(translate: string) => {
				this.elementRef.nativeElement.innerHTML = translate;
			}
		);
	}
}
