import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';

import { RouterModule, Routes } from '@angular/router';
import { ComponentsComponent } from './components.component';

const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./components.component').then((m) => m.ComponentsComponent)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, ComponentsComponent],
	providers: []
})
export class ComponentsModule {}
