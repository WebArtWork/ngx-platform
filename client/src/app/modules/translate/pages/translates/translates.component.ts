import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject
} from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TableComponent } from 'src/app/libs/table/table.component';
import { CoreService, CrudComponent } from 'wacom';
import { phraseForm } from '../../form/phrase.form';
import { Phrase } from '../../interfaces/phrase.interface';
import { LanguageSelectorComponent } from '../../selectors/language/language-selector.component';
import { LanguageService } from '../../services/language.service';
import { PhraseService } from '../../services/phrase.service';
import { TranslateService } from '../../services/translate.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent, LanguageSelectorComponent],
	templateUrl: './translates.component.html'
})
export class TranslatesComponent extends CrudComponent<
	PhraseService,
	Phrase,
	FormInterface
> {
	columns = ['text', 'translation'];

	override allowCreate() {
		return false;
	}

	config = this.getConfig();

	constructor(
		_translateService: TranslateService,
		_phraseService: PhraseService,
		__formService: FormService
	) {
		super(
			phraseForm,
			__formService,
			_translateService,
			_phraseService,
			'phrase'
		);

		this.setDocuments();
	}
}
