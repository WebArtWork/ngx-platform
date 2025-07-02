import { NgClass } from '@angular/common';
import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject
} from '@angular/core';
import { FormService } from '../../libs/form/services/form.service';
import { InputComponent, Value } from '../../libs/input/input.component';

interface Interface {}

@Component({
	templateUrl: './number.component.html',
	imports: [InputComponent, NgClass]
})
export class NumberComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	number(value: Value) {
		return Number(value);
	}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Number', this.templateRef);
	}
}
