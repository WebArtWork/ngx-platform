import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject
} from '@angular/core';
import { ButtonComponent } from 'src/app/libs/button/button.component';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TableComponent } from 'src/app/libs/table/table.component';
import { CoreService, CrudComponent } from 'wacom';
import { languageForm } from '../../form/language.form';
import { phraseForm } from '../../form/phrase.form';
import { Language } from '../../interfaces/language.interface';
import { Phrase } from '../../interfaces/phrase.interface';
import { LanguageSelectorComponent } from '../../selectors/language/language-selector.component';
import { LanguageService } from '../../services/language.service';
import { PhraseService } from '../../services/phrase.service';
import { TranslateService } from '../../services/translate.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent, LanguageSelectorComponent, ButtonComponent],
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

	mutateLanguage(current = true) {
		this._formService
			.modal<Language>(
				languageForm,
				[],
				current ? this._languageService.language() || {} : {}
			)
			.then((updated: Language) => {
				if (current) {
					this._languageService.language.update((language) => {
						language = language || {};

						this._coreService.copy(updated, language);

						return language;
					});

					this._languageService.update(
						this._languageService.language()
					);

					this._cdr.markForCheck();
				} else {
					this._languageService
						.create(updated)
						.subscribe((language) => {
							this._languageService.setLanguage(language);

							this._cdr.markForCheck();
						});
				}
			});
	}

	private _coreService = inject(CoreService);

	private _formService = inject(FormService);

	private _languageService = inject(LanguageService);

	private _cdr = inject(ChangeDetectorRef);
}
