import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject
} from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { InputComponent } from '../../modules/input/input.component';

import { ButtonComponent } from '../../modules/button/button.component';

interface Interface {}

@Component({
	templateUrl: './tags.component.html',
	styleUrls: ['./tags.component.scss'],
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
