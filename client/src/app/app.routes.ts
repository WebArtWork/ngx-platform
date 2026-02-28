import { Routes } from '@angular/router';
import { MetaGuard } from 'wacom';
import { AdminsGuard } from './modules/user/guards/admins.guard';
import { AuthenticatedGuard } from './modules/user/guards/authenticated.guard';
import { GuestGuard } from './modules/user/guards/guest.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./layouts/public/public.component').then(
				(m) => m.PublicComponent,
			),
		children: [
			/* public */
			{
				path: '',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Landing',
					},
				},
				loadChildren: () =>
					import('./pages/public/landing/landing.routes').then(
						(m) => m.routes,
					),
			},
		],
	},
	{
		path: '',
		canActivate: [GuestGuard],
		loadComponent: () =>
			import('./layouts/guest/guest.component').then(
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
			import('./layouts/user/user.component').then(
				(m) => m.UserComponent,
			),
		children: [
			/* user */
			{
				path: 'dashboard',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Dashboard',
					},
				},
				loadChildren: () =>
					import('./pages/user/dashboard/dashboard.routes').then(
						(m) => m.routes,
					),
			},
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
				path: 'settings',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Settings',
					},
				},
				loadChildren: () =>
					import('./pages/user/settings/settings.routes').then(
						(m) => m.routes,
					),
			},
		],
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		loadComponent: () =>
			import('./layouts/user/user.component').then(
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
				path: 'clients',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Clients',
					},
				},
				loadChildren: () =>
					import('./modules/user/pages/clients/clients.routes').then(
						(m) => m.routes,
					),
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms',
					},
				},
				loadChildren: () =>
					import('./libs/form/pages/forms/forms.routes').then(
						(m) => m.routes,
					),
			},
			{
				path: 'form/:formId',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms',
					},
				},
				loadChildren: () =>
					import('./libs/form/pages/form/form.routes').then(
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
						'./libs/translate/pages/translates/translates.routes'
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
