import {
	ChangeDetectionStrategy,
	Component,
	input,
	output
} from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { TranslateService } from 'src/app/libs/translate/translate.service';
import { CrudComponent } from 'wacom';
import { birdForm } from '../../formcomponents/bird.form';
import { Bird } from '../../interfaces/bird.interface';
import { BirdService } from '../../services/bird.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent],
	selector: 'bird-selector',
	templateUrl: './bird-selector.component.html'
})
export class BirdSelectorComponent extends CrudComponent<
	BirdService,
	Bird,
	FormInterface
> {
	readonly searchable = input<boolean>(true);

	readonly clearable = input<boolean>(true);

	readonly disabled = input<boolean>(false);

	readonly value = input<string>();

	readonly wChange = output<string>();

	constructor(
		_birdService: BirdService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(birdForm, _form, _translate, _birdService, 'bird');

		this.setDocuments();
	}
}
