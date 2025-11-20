import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertService } from '@lib/alert';
import { TranslateService } from './modules/translate/services/translate.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet],
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	private _translateService = inject(TranslateService);

	private _alertService = inject(AlertService);

	constructor() {
		// TODO move this inside of alert service
		this._alertService.setTranslate((phrase: string) => {
			return this._translateService.translate(phrase)();
		});
	}
}
