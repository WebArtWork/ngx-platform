import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./translates.component').then((m) => m.TranslatesComponent),
	},
];
