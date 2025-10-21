import { Platform } from '@angular/cdk/platform';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BurgerComponent } from 'src/app/icons/burger/burger.component';
import { TranslateDirective } from 'src/app/modules/translate/directives/translate.directive';
import { LanguageService } from 'src/app/modules/translate/services/language.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
	imports: [
		RouterLinkActive,
		RouterLink,
		RouterOutlet,
		TranslateDirective,
		BurgerComponent,
	],
})
export class UserComponent {
	readonly userService = inject(UserService);
	readonly languageService = inject(LanguageService);
	private readonly platform = inject(Platform);

	// controlled by <icon-burger> via (updated)
	isOpen = signal(false);

	close(): void {
		this.isOpen.set(false);
	}

	closeIfDesktop(): void {
		if (!this.platform.ANDROID && !this.platform.IOS) this.close();
	}
}
