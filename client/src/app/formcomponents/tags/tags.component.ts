import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject
} from '@angular/core';
import { FormService } from '../../libs/form/form.service';
import { InputComponent } from '../../libs/input/input.component';

import { ButtonComponent } from '../../libs/button/button.component';

interface Interface {}

@Component({
	templateUrl: './tags.component.html',
	imports: [InputComponent, ButtonComponent]
})
export class TagsComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

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
