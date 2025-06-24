import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { WacomModule } from 'wacom';
import { TranslatesComponent } from './translates.component';

const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./translates.component').then((m) => m.TranslatesComponent)
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		FormsModule,
		WacomModule,
		TranslatesComponent
	],
	providers: []
})
export class TranslatesModule {}
