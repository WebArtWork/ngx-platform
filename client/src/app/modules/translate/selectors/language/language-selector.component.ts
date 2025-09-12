import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { SelectButton } from 'src/app/libs/select/select.interface';
import { SelectValue } from 'src/app/libs/select/select.type';
import { TranslatePipe } from 'src/app/modules/translate/pipes/translate.pipe';
import {
	AlertService,
	CoreService,
	CrudComponent,
	EmitterService,
} from 'wacom';
import { languageForm } from '../../form/language.form';
import { LanguageFormcomponent } from '../../form/language/language.formcomponent';
import { Language } from '../../interfaces/language.interface';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '../../services/translate.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent, TranslatePipe],
	selector: 'language-selector',
	templateUrl: './language-selector.component.html',
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

	private _emitterService = inject(EmitterService);

	selected: SelectValue;

	buttons: SelectButton[] = [
		{
			icon: this.languageService.language() ? 'edit' : '',
			click: () => {
				this.mutate();
			},
		},
		{
			icon: this.languageService.language() ? 'delete' : '',
			click: () => {
				this.delete(this.languageService.language() as Language);
			},
		},
		{
			icon: 'add',
			click: () => {
				this.mutate(false);
			},
		},
	];

	constructor(
		_languageService: LanguageService,
		_translate: TranslateService,
		_form: FormService,
	) {
		super(
			LanguageFormcomponent,
			_form,
			_translate,
			_languageService,
			'language',
		);

		this.setDocuments();

		this._emitterService.on('languageId').subscribe((languageId) => {
			this.buttons[0].icon = 'edit';

			this.buttons[1].icon = 'delete';
		});
	}

	mutate(current = true) {
		const doc = current
			? this.documents().find(
					(d) => d()._id === (this.selected || this.value()),
				) || {}
			: {};

		this._formService
			.modal<Language>(languageForm, [], doc)
			.then((updated: Language) => {
				if (current) {
					this.languageService.language.update((language) => {
						language = language || ({} as Language);

						this._coreService.copy(updated, language);

						return language;
					});

					this.languageService.update(
						this.languageService.language() as Language,
					);
				} else {
					this.languageService
						.create(updated)
						.subscribe((language) => {
							this.languageService.setLanguage(language);
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
