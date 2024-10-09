import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TestComponent } from './test.component';
import { Routes, RouterModule } from '@angular/router';
import { CollapseModule } from 'src/app/core/modules/collapse/collapse.module';

const routes: Routes = [
	{
		path: '',
		component: TestComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, CollapseModule],
	declarations: [TestComponent],
	providers: []
})
export class TestModule {}