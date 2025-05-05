import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BirdsComponent } from './birds.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BirdsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BirdsComponent],
	providers: []
})
export class BirdsModule {}
