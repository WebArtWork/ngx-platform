import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject
} from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TableComponent } from 'src/app/libs/table/table.component';
import { TranslateService } from 'src/app/libs/translate/translate.service';
import { CrudComponent } from 'wacom';
import { birdFormComponents } from '../../formcomponents/bird.formcomponents';
import { Bird } from '../../interfaces/bird.interface';
import { BirdService } from '../../services/bird.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent],
	templateUrl: './birds.component.html',
	styleUrls: ['./birds.component.scss']
})
export class BirdsComponent extends CrudComponent<
	BirdService,
	Bird,
	FormInterface
> {
	private _cdr = inject(ChangeDetectorRef);

	columns = ['name', 'description'];

	config = this.getConfig();

	constructor(
		_birdService: BirdService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(birdFormComponents, _form, _translate, _birdService, 'bird');

		this.setDocuments();

		_birdService.loaded.then(() => {
			this._cdr.detectChanges();

			console.log('loaded');
		});
	}
}
