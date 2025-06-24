import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
	selector: 'ng-template[item]'
})
export class ItemDirective {
	template = inject<TemplateRef<any>>(TemplateRef);
}
