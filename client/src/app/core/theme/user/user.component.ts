import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateDirective } from 'src/app/libs/translate/translate.directive';
import { TranslateService } from 'src/app/libs/translate/translate.service';
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
		RouterOutlet
	]
})
export class UserComponent {
	userService = inject(UserService);
	translateService = inject(TranslateService);
	private _platform = inject(Platform);

	showSidebar = false;

	hideSidebar(): void {
		if (!this._platform.ANDROID && !this._platform.IOS) {
			this.showSidebar = false;
		}
	}
}
