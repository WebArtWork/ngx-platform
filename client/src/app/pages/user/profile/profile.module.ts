import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';

import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./profile.component').then((m) => m.ProfileComponent)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, ProfileComponent],
	providers: []
})
export class ProfileModule {}
