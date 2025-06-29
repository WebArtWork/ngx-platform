import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: '',
		component: ProfileComponent
	}
];

@NgModule({
    imports: [RouterModule.forChild(routes), CoreModule, ProfileComponent],
    providers: []
})
export class ProfileModule {}
