import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '@env';
import { MaterialComponent } from '@icon/material';
import { TranslateDirective } from '@lib/translate';
import { UserService } from 'src/app/modules/user/services/user.service';
import { FooterLink } from './footer.types';

@Component({
	selector: 'layout-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './footer.component.html',
	imports: [RouterLink, MaterialComponent, TranslateDirective],
})
export class FooterComponent {
	readonly userService = inject(UserService);

	readonly year = new Date().getFullYear();

	readonly metaTitle = environment.meta.title;

	readonly metaDescription = environment.meta.description;

	private readonly allLinks = computed<FooterLink[]>(() => [
		{ label: 'Home', icon: 'home', to: '/' },
		{ label: 'Profile', icon: 'account_circle', to: '/profile' },

		// Sidebar admin links
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

		// Sidebar link
		{ label: 'Birds', icon: 'translate', to: '/birds' },
	]);

	readonly links = computed(() => {
		const isAdmin = this.userService.role('admin');

		return this.allLinks().filter((l) => !l.adminOnly || isAdmin);
	});
}
