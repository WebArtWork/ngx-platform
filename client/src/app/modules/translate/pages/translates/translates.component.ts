import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from '@lib/alert';
import { FormService } from '@lib/form';
import { TranslateDirective } from '@module/translate/directives/translate.directive';
import { Translate } from '@module/translate/interfaces/translate.interface';
import { TranslateService } from '@module/translate/services/translate.service';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { TableComponent } from 'src/app/libs/table/table.component';
import {
	CellDirective,
	TableHeaderDirective,
} from 'src/app/libs/table/table.directive';
import { CrudComponent } from 'wacom';
import { phraseForm } from '../../form/phrase.form';
import { Phrase } from '../../interfaces/phrase.interface';
import { LanguageSelectorComponent } from '../../selectors/language/language-selector.component';
import { LanguageService } from '../../services/language.service';
import { PhraseService } from '../../services/phrase.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		TableComponent,
		LanguageSelectorComponent,
		CellDirective,
		TableHeaderDirective,
		TranslateDirective,
	],
	templateUrl: './translates.component.html',
})
export class TranslatesComponent extends CrudComponent<
	PhraseService,
	Phrase,
	FormInterface
> {
	private _translateService = inject(TranslateService);

	private _languageService = inject(LanguageService);

	private _alertService = inject(AlertService);

	columns = ['phrase', 'translation'];

	override configType: 'server' | 'local' = 'local';

	override allowCreate() {
		return false;
	}

	override allowUrl() {
		return false;
	}

	override update(doc: Phrase) {
		const language = this._languageService.language()?._id ?? '';

		const phrase = doc._id as string;

		if (language) {
			const translationSignal = this._translateService.translate(
				doc.text,
			);

			this._formService.modal<Phrase>(
				phraseForm,
				{
					label: 'Update',
					click: async (updated: unknown, close: () => void) => {
						close();

						const text = (updated as Phrase).translation as string;

						if (translationSignal() !== text) {
							translationSignal.set(text);

							const translate =
								await this._translateService.getDoc(
									(_translate: Translate) => {
										return (
											_translate.language ===
												this._languageService.language()
													?._id &&
											_translate.phrase === phrase
										);
									},
								);

							if (translate) {
								translate.text = text;

								this._translateService.update(translate);
							} else {
								this._translateService.create({
									language,
									phrase,
									text,
								});
							}
						}
					},
				},
				{
					translation:
						translationSignal() === doc.text
							? ''
							: translationSignal(),
					text: doc.text,
				},
			);
		} else {
			this._alertService.show({
				text: 'Please select language first',
			});
		}
	}

	config = this.getConfig();

	constructor(private _formService: FormService) {
		super(phraseForm, _formService, inject(PhraseService), 'phrase');

		this.setDocuments();
	}

	languageService = inject(LanguageService);
}
