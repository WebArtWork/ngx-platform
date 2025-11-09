import { NgClass } from '@angular/common';
import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { FormService } from '../../libs/form/services/form.service';
import { InputComponent } from '../../libs/input/input.component';

interface Interface {}

@Component({
	selector: 'w-form-html',
	templateUrl: './html.component.html',
	imports: [InputComponent, NgClass],
})
export class HtmlComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Html', this.templateRef);
	}
}
