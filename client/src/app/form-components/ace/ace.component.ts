import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { ACE_CONFIG, AceConfigInterface, AceModule } from 'ngx-ace-wrapper';
import { FormService } from 'src/app/libs/form/services/form.service';

interface Interface {}

const DEFAULT_ACE_CONFIG: AceConfigInterface = {};

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './ace.component.html',
	styleUrl: './ace.component.scss',
	imports: [NgClass, AceModule],
	providers: [
		{
			provide: ACE_CONFIG,
			useValue: DEFAULT_ACE_CONFIG,
		},
	],
})
export class AceFormComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		// "Ace" here is the component name you will use in form JSON
		this._form.addTemplateComponent<Interface>('Ace', this.templateRef);
	}

	onValueChange(data: any, value: string): void {
		data.submition[data.key] = value;
		data.wChange();
	}
}
