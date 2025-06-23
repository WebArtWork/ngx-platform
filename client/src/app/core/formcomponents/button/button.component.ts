import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { ButtonComponent as ButtonComponent_1 } from '../../modules/button/button.component';

interface Interface {}

@Component({
    selector: 'button-formcomponents',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    imports: [ButtonComponent_1]
})
export class ButtonComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Button', this.templateRef);
	}

	click(data: any): void {
		if (typeof data.field.Click === 'function') {
			data.field.Click();
		}
	}
}
