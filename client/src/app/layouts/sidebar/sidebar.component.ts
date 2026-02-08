import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialComponent } from '@icon/material';
import { ThemeComponent } from '@icon/theme';
import { ButtonComponent } from '@lib/button';
import { LanguageService, TranslateDirective } from '@lib/translate';
import { UserService } from 'src/app/modules/user/services/user.service';
import { ThemeService } from 'wacom';

@Component({
	selector: 'layout-sidebar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './sidebar.component.html',
	imports: [
		RouterLink,
		TranslateDirective,
		MaterialComponent,
		ButtonComponent,
		ThemeComponent,
		NgClass,
	],
})
export class SidebarComponent {
	readonly isOpen = input(false);
	readonly requestClose = output<void>();

	readonly themeService = inject(ThemeService);
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
