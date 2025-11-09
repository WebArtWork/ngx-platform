import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { ButtonComponent } from '../../libs/button/button.component';
import { FormService } from '../../libs/form/services/form.service';
import { InputComponent } from '../../libs/input/input.component';

interface Interface {}

@Component({
	templateUrl: './tags.component.html',

	imports: [InputComponent, ButtonComponent],
})
export class TagsComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Tags', this.templateRef);
	}
	addTag(data: any): void {
		const name = data.props?.__name;
		if (!name) return;

		// Inform host to add tag at current key; the actual append logic
		// is expected to be handled by the template bound to VirtualFormService.
		// If your winput supports programmatic patching, you can emit a custom event.
		if (Array.isArray((data.props as any).__buffer)) {
			(data.props as any).__buffer.push(name);
		}
		// Notify form to re-evaluate
		data.props.__name = '';
		setTimeout(() => data.wChange());
	}
}
