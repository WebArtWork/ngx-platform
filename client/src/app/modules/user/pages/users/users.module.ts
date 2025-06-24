import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';

import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./users.component').then((m) => m.UsersComponent)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, UsersComponent],
	providers: []
})
export class UsersModule {}
