import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';

import { RouterModule, Routes } from '@angular/router';
import { CustomformsComponent } from './customforms.component';

const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./customforms.component').then(
				(m) => m.CustomformsComponent
			)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, CustomformsComponent],
	providers: []
})
export class CustomformsModule {}
