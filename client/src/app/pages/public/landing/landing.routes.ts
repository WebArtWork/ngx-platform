import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./landing.component').then((m) => m.LandingComponent),
	},
];
