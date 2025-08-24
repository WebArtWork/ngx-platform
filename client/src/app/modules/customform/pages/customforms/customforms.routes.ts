import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./customforms.component').then(
				(m) => m.CustomformsComponent,
			),
	},
];
