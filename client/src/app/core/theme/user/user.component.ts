import { UserService } from 'src/app/modules/user/services/user.service';
import { coreAnimation } from '../../animations/core.animations';
import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { WacomModule } from 'wacom';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { TranslateDirective } from '../../modules/translate/translate.directive';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: [coreAnimation],
    imports: [WacomModule, RouterLinkActive, RouterLink, NgIf, TranslateDirective, RouterOutlet]
})
export class UserComponent {
	showSidebar = false;

	hideSidebar(): void {
		if (!this._platform.ANDROID && !this._platform.IOS) {
			this.showSidebar = false;
		}
	}

	constructor(public us: UserService, private _platform: Platform) {}
}
