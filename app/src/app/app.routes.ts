import { Routes } from '@angular/router';
import { UserTheme } from './core/components/user-theme/user-theme';
import { GuestTheme } from './core/components/guest-theme/guest-theme';
import { PublicTheme } from './core/components/public-theme/public-theme';
import { adminsGuard } from './core/guards/admins-guard';
import { usersGuard } from './core/guards/users-guard';
import { guestsGuard } from './core/guards/guests-guard';

export const routes: Routes = [
	{
		path: '',
		component: PublicTheme,
		children: [
			/* public */
		],
	},
	{
		path: 'admin',
		component: UserTheme,
		canActivate: [adminsGuard],
		children: [
			/* admin */
		],
	},
	{
		path: '',
		component: UserTheme,
		canActivate: [usersGuard],
		children: [
			/* user */
		],
	},
	{
		path: '',
		component: GuestTheme,
		canActivate: [guestsGuard],
		children: [
			/* guest */
			{
				path: 'sign',
				loadChildren: () =>
					import('./pages/guest/sign/routes').then((m) => m.routes),
			},
		],
	},
];
