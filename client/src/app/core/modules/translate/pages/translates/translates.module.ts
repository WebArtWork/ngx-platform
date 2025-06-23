import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatesComponent } from './translates.component';
import { WacomModule } from 'wacom';





const routes: Routes = [
	{
		path: '',
		component: TranslatesComponent
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
