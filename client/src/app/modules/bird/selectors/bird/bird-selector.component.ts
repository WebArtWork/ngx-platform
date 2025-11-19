
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { SelectValue } from 'src/app/libs/select/select.type';
import { TranslatePipe } from 'src/app/modules/translate/pipes/translate.pipe';
import { TranslateService } from 'src/app/modules/translate/services/translate.service';
import { CrudComponent } from 'wacom';
import { birdForm } from '../../forms/bird.form';
import { Bird } from '../../interfaces/bird.interface';
import { BirdService } from '../../services/bird.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent, TranslatePipe],
	selector: 'bird-selector',
	templateUrl: './bird-selector.component.html',
})
export class BirdSelectorComponent extends CrudComponent<
	BirdService,
	Bird,
	FormInterface
> {
	readonly searchable = input<boolean>(true);

	readonly clearable = input<boolean>(true);

	readonly disabled = input<boolean>(false);

	readonly wModel = input<SelectValue>('');

	readonly wChange = output<SelectValue>();

	constructor(
		_birdService: BirdService,
		_translate: TranslateService,
		_form: FormService,
	) {
		super(birdForm, _form, _translate, _birdService, 'bird');

		this.setDocuments();
	}
}
