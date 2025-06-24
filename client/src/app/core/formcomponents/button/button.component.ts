import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject
} from '@angular/core';
import { ButtonComponent as ButtonComponent_1 } from '../../modules/button/button.component';
import { FormService } from '../../modules/form/form.service';

interface Interface {}

@Component({
	selector: 'button-formcomponents',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	imports: [ButtonComponent_1]
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
