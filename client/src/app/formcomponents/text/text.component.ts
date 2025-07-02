import { NgClass } from '@angular/common';
import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject
} from '@angular/core';
import { FormService } from '../../libs/form/services/form.service';
import { InputComponent } from '../../libs/input/input.component';

interface Interface {}

@Component({
	templateUrl: './text.component.html',
	imports: [InputComponent, NgClass]
})
export class TextComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Text', this.templateRef);
	}
}
