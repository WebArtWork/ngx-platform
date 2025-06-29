import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { InputComponent } from '../../modules/input/input.component';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../modules/button/button.component';

interface Interface {}

@Component({
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    imports: [InputComponent, NgFor, ButtonComponent]
})
export class TagsComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Tags', this.templateRef);
	}

	addTag(data: any): void {
		data.submition[data.key] = data.submition[data.key] || [];

		data.submition[data.key].push(data.field.__name);

		data.field.__name = '';

		data.wChange();

		setTimeout(() => {
			data.field.focus();
		}, 100);
	}
}
