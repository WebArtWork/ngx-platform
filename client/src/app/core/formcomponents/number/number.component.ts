import { NgClass } from '@angular/common';
import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject
} from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { InputComponent, Value } from '../../modules/input/input.component';

interface Interface {}

@Component({
	templateUrl: './number.component.html',
	styleUrls: ['./number.component.scss'],
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
