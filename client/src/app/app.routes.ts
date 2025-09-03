import { Routes } from '@angular/router';
import { MetaGuard } from 'wacom';
import { AdminsGuard } from './core/guards/admins.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full',
	},
	{
		path: '',
		canActivate: [GuestGuard],
		loadComponent: () =>
			import('./core/theme/guest/guest.component').then(
				(m) => m.GuestComponent,
			),
		children: [
			/* guest */
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign',
					},
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.routes').then(
						(m) => m.routes,
					),
			},
		],
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		loadComponent: () =>
			import('./core/theme/user/user.component').then(
				(m) => m.UserComponent,
			),
		children: [
			/* user */
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile',
					},
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.routes').then(
						(m) => m.routes,
					),
			},
			{
				path: 'birds',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign',
					},
				},
				loadChildren: () =>
					import('./modules/bird/pages/birds/birds.routes').then(
						(m) => m.routes,
					),
			},
		],
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		loadComponent: () =>
			import('./core/theme/user/user.component').then(
				(m) => m.UserComponent,
			),
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users',
					},
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.routes').then(
						(m) => m.routes,
					),
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates',
					},
				},
				loadChildren: () =>
					import(
						'./modules/translate/pages/translates/translates.routes'
					).then((m) => m.routes),
			},
		],
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full',
	},
];
