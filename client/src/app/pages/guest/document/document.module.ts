import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document.component';

const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./document.component').then((m) => m.DocumentComponent)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), DocumentComponent]
})
export class DocumentModule {}
