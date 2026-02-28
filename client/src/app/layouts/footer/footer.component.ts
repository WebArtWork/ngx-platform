import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '@env';
import { MaterialComponent } from '@icon/material';
import { ButtonComponent } from '@lib/button';
import { UserService } from 'src/app/modules/user/user.service';
import { ThemeService, TranslateDirective } from 'wacom';
import { FooterLink } from './footer.types';

@Component({
	selector: 'layout-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './footer.component.html',
	imports: [
		RouterLink,
		MaterialComponent,
		TranslateDirective,
		ButtonComponent,
		NgClass,
	],
})
export class FooterComponent {
	readonly userService = inject(UserService);
	readonly themeService = inject(ThemeService);

	readonly year = new Date().getFullYear();
	readonly metaTitle = environment.meta.title;
	readonly metaDescription = environment.meta.description;

	readonly mode = computed(() => this.themeService.mode() ?? 'light');
	readonly modes = computed(() => this.themeService.modes());

	readonly density = computed(
		() => this.themeService.density() ?? 'comfortable',
	);
	readonly densities = computed(() => this.themeService.densities());

	readonly radius = computed(() => this.themeService.radius() ?? 'rounded');
	readonly radiuses = computed(() => this.themeService.radiuses());

	setMode(mode: string): void {
		this.themeService.setMode(mode);
	}

	setDensity(density: string): void {
		this.themeService.setDensity(density);
	}

	setRadius(radius: string): void {
		this.themeService.setRadius(radius);
	}

	private readonly allLinks = computed<FooterLink[]>(() => [
		{ label: 'Home', icon: 'home', to: '/' },
		{ label: 'Profile', icon: 'account_circle', to: '/profile' },
		{
			label: 'Users',
			icon: 'manage_accounts',
			to: '/admin/users',
			adminOnly: true,
		},
		{
			label: 'Clients',
			icon: 'people',
			to: '/admin/clients',
			adminOnly: true,
		},
		{
			label: 'Forms',
			icon: 'backup_table',
			to: '/admin/forms',
			adminOnly: true,
		},
		{
			label: 'Translates',
			icon: 'translate',
			to: '/admin/translates',
			adminOnly: true,
		},
	]);

	readonly links = computed(() => {
		const isAdmin = this.userService.role('admin');
		return this.allLinks().filter((l) => !l.adminOnly || isAdmin);
	});
}
