import { NgClass } from '@angular/common';
import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject
} from '@angular/core';
import { UiService } from 'wacom';
import { FormService } from '../../libs/form/services/form.service';
import { InputComponent } from '../../libs/input/input.component';
interface Interface {}
@Component({
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.scss'],
	imports: [InputComponent, NgClass]
})
export class PasswordComponent implements OnInit {
	private _form = inject(FormService);
	ui = inject(UiService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>(
			'Password',
			this.templateRef
		);
	}
}
