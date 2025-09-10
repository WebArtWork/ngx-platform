import { Platform } from '@angular/cdk/platform';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateDirective } from 'src/app/modules/translate/directives/translate.directive';
import { LanguageService } from 'src/app/modules/translate/services/language.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { WacomModule } from 'wacom';
import { coreAnimation } from '../../animations/core.animations';

@Component({
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
	animations: [coreAnimation],
	imports: [
		WacomModule,
		RouterLinkActive,
		RouterLink,
		TranslateDirective,
		RouterOutlet,
	],
})
export class UserComponent {
	userService = inject(UserService);

	languageService = inject(LanguageService);

	private _platform = inject(Platform);

	showSidebar = signal(false);

	hideSidebar(): void {
		if (!this._platform.ANDROID && !this._platform.IOS) {
			this.showSidebar.set(false);
		}
	}
}
