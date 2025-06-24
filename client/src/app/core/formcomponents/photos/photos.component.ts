import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { FileComponent } from '../../modules/file/file.component';
interface Interface {}
@Component({
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.scss'],
    imports: [FileComponent]
})
export class PhotosComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);
	constructor() {}
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Photos', this.templateRef);
	}
}
