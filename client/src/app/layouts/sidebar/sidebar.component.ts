import { NgClass, TitleCasePipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialComponent } from '@icon/material';
import { ButtonComponent } from '@lib/button';
import { TranslateDirective } from 'src/app/modules/translate/directives/translate.directive';
import { LanguageService } from 'src/app/modules/translate/services/language.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	selector: 'layout-sidebar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './sidebar.component.html',
	imports: [
		RouterLink,
		TranslateDirective,
		MaterialComponent,
		TitleCasePipe,
		ButtonComponent,
		NgClass,
	],
})
export class SidebarComponent {
	readonly isOpen = input(false);
	readonly requestClose = output<void>();

	readonly userService = inject(UserService);
	readonly languageService = inject(LanguageService);

	closeIfOpen(): void {
		if (this.isOpen()) this.requestClose.emit();
	}

	logout(): void {
		this.userService.logout();

		this.closeIfOpen();
	}
}
