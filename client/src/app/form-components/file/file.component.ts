import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { FileComponent, fileDefaults } from '@lib/file';
import { FormService } from '@lib/form';

interface FileTemplateContext {}

@Component({
	imports: [FileComponent],
	templateUrl: './file.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileFormComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<FileTemplateContext>;

	readonly fileDefaults = fileDefaults;

	constructor(private _formService: FormService) {}

	ngOnInit(): void {
		this._formService.addTemplateComponent<FileTemplateContext>(
			'File',
			this.templateRef,
		);
	}
}
