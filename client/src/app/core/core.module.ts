import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WacomModule } from 'wacom';




import { IconsModule } from './icons/icons.module';

import { FormcomponentsModule } from './formcomponents/formcomponents.module';


/* imports */

const components: Type<any>[] = [
	/* components */
];

const selectors: Type<any>[] = [
	/* selectors */
];

const pipes: Type<any>[] = [
	/* pipes */
];

@NgModule({
	declarations: components.concat(selectors).concat(pipes),
	exports: [
    CommonModule,
    FormsModule,
    WacomModule,
    IconsModule
]
		.concat(components)
		.concat(selectors)
		.concat(pipes),
	imports: [
    FormcomponentsModule,
    CommonModule,
    FormsModule,
    WacomModule
]
})
export class CoreModule {}
