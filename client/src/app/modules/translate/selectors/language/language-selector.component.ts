import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output
} from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { SelectValue } from 'src/app/libs/select/select.type';
import { TranslatePipe } from 'src/app/libs/translate/translate.pipe';
import { TranslateService } from 'src/app/libs/translate/translate.service';
import { CrudComponent } from 'wacom';
import { LanguageFormcomponent } from '../../form/language/language.formcomponent';
import { Language } from '../../interfaces/language.interface';
import { LanguageService } from '../../services/language.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent, TranslatePipe, CommonModule],
	selector: 'language-selector',
	templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent extends CrudComponent<
	LanguageService,
	Language,
	FormInterface
> {
	readonly searchable = input<boolean>(true);

	readonly clearable = input<boolean>(true);

	readonly disabled = input<boolean>(false);

	readonly value = input<SelectValue>('');

	readonly wChange = output<SelectValue>();

	constructor(
		_languageService: LanguageService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(
			LanguageFormcomponent,
			_form,
			_translate,
			_languageService,
			'language'
		);

		this.setDocuments();
	}
}
