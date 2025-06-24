import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { WacomModule } from 'wacom';
import { coreAnimation } from '../../animations/core.animations';

import { TranslateDirective } from '../../modules/translate/translate.directive';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
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
	us = inject(UserService);
	private _platform = inject(Platform);

	showSidebar = false;

	hideSidebar(): void {
		if (!this._platform.ANDROID && !this._platform.IOS) {
			this.showSidebar = false;
		}
	}
}
