import { Component } from '@angular/core';
import { BirdService } from '../../services/bird.service';
import { Bird } from '../../interfaces/bird.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { birdFormComponents } from '../../formcomponents/bird.formcomponents';
import { CrudComponent } from 'wacom';

@Component({
	templateUrl: './birds.component.html',
	styleUrls: ['./birds.component.scss'],
	standalone: false
})
export class BirdsComponent extends CrudComponent<BirdService, Bird> {
	columns = ['name', 'description'];

	protected override documents: Bird[];

	config = {
		// ...this.getConfig()
	};

	constructor(
		_birdService: BirdService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(birdFormComponents, _form, _translate, _birdService);

		// this.setDocuments();

		setTimeout(() => {
			console.log(this);
		}, 5000);
	}
}
