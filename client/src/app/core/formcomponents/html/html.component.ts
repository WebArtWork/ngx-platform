import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { TinymceComponent } from 'ngx-tinymce';
import { FormsModule } from '@angular/forms';

interface Interface {}

@Component({
    templateUrl: './html.component.html',
    styleUrls: ['./html.component.scss'],
    imports: [TinymceComponent, FormsModule]
})
export class HtmlComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	editorConfig = {
		height: 500,
		menubar: true,
		plugins: [
			'advlist autolink lists link image charmap print preview anchor',
			'searchreplace visualblocks code fullscreen',
			'insertdatetime media table paste code help wordcount'
		],
		toolbar:
			'undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | help'
	};

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Html', this.templateRef);
	}
}
