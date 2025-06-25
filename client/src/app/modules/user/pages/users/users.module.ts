import { NgModule } from '@angular/core';
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
	imports: [RouterModule.forChild(routes), UsersComponent],
	providers: []
})
export class UsersModule {}
