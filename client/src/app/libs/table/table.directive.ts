import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({ selector: 'ng-template[cell]' })
export class CellDirective {
	template = inject<TemplateRef<any>>(TemplateRef);
	@Input() cell: any;
}

@Directive({ selector: 'ng-template[sort]' })
export class SortDirective {
	template = inject<TemplateRef<any>>(TemplateRef);
	@Input() cell: any;
}

@Directive({ selector: 'ng-template[actions]' })
export class ActionsDirective {
	template = inject<TemplateRef<any>>(TemplateRef);
}

@Directive({ selector: 'ng-template[customEdit]' })
export class CustomEditDirective {
	template = inject<TemplateRef<any>>(TemplateRef);
}
