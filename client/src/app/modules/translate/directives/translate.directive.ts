import {
	Directive,
	ElementRef,
	Injector,
	OnInit,
	effect,
	inject,
	runInInjectionContext,
} from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Directive({ selector: '[translate]' })
export class TranslateDirective implements OnInit {
	private readonly _el = inject(ElementRef<HTMLElement>);

	private readonly _translateService = inject(TranslateService);

	private readonly _inj = inject(Injector);

	ngOnInit() {
		const original = this._el.nativeElement.textContent ?? '';

		const translated = this._translateService.translate(original);

		runInInjectionContext(this._inj, () => {
			effect(() => {
				this._el.nativeElement.textContent = translated();
			});
		});
	}
}
