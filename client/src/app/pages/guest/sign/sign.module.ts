import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './sign.component';

const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./sign.component').then((m) => m.SignComponent)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), SignComponent],
	providers: []
})
export class SignModule {}
