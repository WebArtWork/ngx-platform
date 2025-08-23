import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output
} from '@angular/core';
import { ButtonComponent } from 'src/app/libs/button/button.component';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { SelectValue } from 'src/app/libs/select/select.type';
import { TranslatePipe } from 'src/app/libs/translate/translate.pipe';
import { AlertService, CoreService, CrudComponent } from 'wacom';
import { languageForm } from '../../form/language.form';
import { LanguageFormcomponent } from '../../form/language/language.formcomponent';
import { Language } from '../../interfaces/language.interface';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '../../services/translate.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent, TranslatePipe, ButtonComponent],
	selector: 'language-selector',
	templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent extends CrudComponent<
	LanguageService,
	Language,
	FormInterface
> {
	readonly mutatable = input<boolean>(false);

	readonly searchable = input<boolean>(true);

	readonly clearable = input<boolean>(true);

	readonly disabled = input<boolean>(false);

	readonly value = input<SelectValue>('');

	readonly wChange = output<SelectValue>();

	languageService = inject(LanguageService);

	selected: SelectValue;

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

	mutate(current = true) {
		const doc = current
			? this.documents().find(
					(d) => d()._id === (this.selected || this.value())
				) || {}
			: {};

		this._formService
			.modal<Language>(languageForm, [], doc)
			.then((updated: Language) => {
				if (current) {
					this.languageService.language.update((language) => {
						language = language || {};

						this._coreService.copy(updated, language);

						return language;
					});

					this.languageService.update(
						this.languageService.language()
					);
				} else {
					this.languageService
						.create(updated)
						.subscribe((language) => {
							this.languageService.setLanguage(language._id);
						});
				}
			});
	}

	// delete() {
	// 	this._alertService.question({
	// 		text: this._translateService.translate(
	// 			`Are you sure you want to delete this language?`
	// 		),
	// 		buttons: [
	// 			{ text: this._translateService.translate('No') },
	// 			{
	// 				text: this._translateService.translate('Yes'),
	// 				callback: async (): Promise<void> => {
	// 					this.languageService.nextLanguage();

	// 					this.languageService.delete(
	// 						this.languageService.language()
	// 					);
	// 				}
	// 			}
	// 		]
	// 	});
	// }

	private _coreService = inject(CoreService);

	private _alertService = inject(AlertService);

	private _formService = inject(FormService);

	private _translateService = inject(TranslateService);
}
