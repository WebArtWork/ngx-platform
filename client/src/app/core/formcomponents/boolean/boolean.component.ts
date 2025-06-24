import { NgClass } from '@angular/common';
import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject
} from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { InputComponent } from '../../modules/input/input.component';

interface Interface {}

@Component({
	templateUrl: './boolean.component.html',
	styleUrl: './boolean.component.scss',
	imports: [InputComponent, NgClass]
})
export class BooleanComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Boolean', this.templateRef);
	}
}
