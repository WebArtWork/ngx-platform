import { NgModule } from '@angular/core';
/* components */
import { SpiderComponent } from './spider/spider.component';

const icons = [
	/* icons */
	SpiderComponent
];

@NgModule({
    imports: [...icons],
    exports: icons
})
export class IconsModule {}
