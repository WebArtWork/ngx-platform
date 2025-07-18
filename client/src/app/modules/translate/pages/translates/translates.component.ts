import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TableComponent } from 'src/app/libs/table/table.component';
import { TranslateService } from 'src/app/libs/translate/translate.service';
import { CrudComponent } from 'wacom';
import { phraseForm } from '../../form/phrase.form';
import { Phrase } from '../../interfaces/phrase.interface';
import { LanguageSelectorComponent } from '../../selectors/language/language-selector.component';
import { PhraseService } from '../../services/phrase.service';

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

	config = this.getConfig();

	constructor(
		_phraseService: PhraseService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(phraseForm, _form, _translate, _phraseService, 'phrase');

		this.setDocuments();
	}
}
