import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialComponent } from '@icon/material';
import { LanguageService } from '@lib/translate';
import { UserService } from 'src/app/modules/user/user.service';
import { ThemeService, TranslateDirective } from 'wacom';
import { SidebarService } from './sidebar.service';

@Component({
	selector: 'layout-sidebar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
	imports: [RouterLink, TranslateDirective, MaterialComponent, NgClass],
})
export class SidebarComponent {
	readonly themeService = inject(ThemeService);
	readonly userService = inject(UserService);
	readonly languageService = inject(LanguageService);
	readonly sidebarService = inject(SidebarService);

	readonly showNames = this.sidebarService.showNames;
	readonly widthPx = this.sidebarService.widthPx;

	readonly isPreview = this.sidebarService.previewVisible;
	readonly isMobile = this.sidebarService.isMobile;

	readonly isOverlay = computed(() => this.isMobile() || this.isPreview());
	readonly isMinimized = computed(
		() =>
			!this.isMobile() &&
			!this.isPreview() &&
			this.sidebarService.webMode() === 'minimized',
	);

	closeIfOverlay(): void {
		if (this.isOverlay()) this.sidebarService.closeAfterNavigation();
	}

	closeBackdrop(e: MouseEvent): void {
		// block click from reaching the page underneath
		e.preventDefault();
		e.stopPropagation();

		this.sidebarService.requestClose();
	}

	logout(): void {
		this.userService.logout();
		this.sidebarService.closeAfterNavigation();
	}
}
