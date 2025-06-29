import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { SelectComponent as SelectComponent_1 } from '../../modules/select/select.component';
import { NgClass } from '@angular/common';

interface Interface {}

@Component({
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    imports: [SelectComponent_1, NgClass]
})
export class SelectComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Select', this.templateRef);
	}

	select(data: any): string {
		return data.value?.name || (data.value as unknown as string) || '';
	}
}
