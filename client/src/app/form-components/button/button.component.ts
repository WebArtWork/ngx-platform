import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { ButtonComponent as LibButtonComponent } from '../../libs/button/button.component';
import { FormService } from '../../libs/form/services/form.service';

interface Interface {}

@Component({
	selector: 'button-formcomponents',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	imports: [LibButtonComponent],
})
export class ButtonComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Button', this.templateRef);
	}

	click(data: any): void {
		if (typeof data.field.Click === 'function') {
			data.field.Click();
		}
	}
}
