import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
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
import { TranslateService } from '../../services/translate.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		TableComponent,
		LanguageSelectorComponent,
		CellDirective,
		TableHeaderDirective,
	],
	templateUrl: './translates.component.html',
})
export class TranslatesComponent extends CrudComponent<
	PhraseService,
	Phrase,
	FormInterface
> {
	columns = ['phrase', 'translation'];

	override configType: 'server' | 'local' = 'local';

	override allowCreate() {
		return false;
	}

	override allowUrl() {
		return false;
	}

	override update(doc: Phrase) {
		doc.translation = this._translateService.translate(doc.text)();

		this._formService.modal<Phrase>(
			{
				formId: 'phrase',
				title: 'Phrase',
				components: [
					{
						name: 'Input',
						key: 'text',
						focused: true,
						props: {
							label: 'Origin text',
							placeholder: 'Enter origin text...',
							type: 'textarea',
						},
					},
					{
						name: 'Input',
						key: 'translation',
						props: {
							label: 'Translation',
							placeholder: 'Enter translation text...',
							type: 'textarea',
						},
					},
				],
			},
			{
				label: 'Update',
				click: (updated: unknown, close: () => void) => {
					close();

					if (doc.text !== (updated as Phrase).text) {
						doc.text = (updated as Phrase).text;

						this._phraseService.update(doc);
					}

					if (doc.translation !== (updated as Phrase).translation) {
					}

					console.log(
						this.languageService.language()?._id,
						doc.text,
						(updated as Phrase).text,
						doc.translation,
						(updated as Phrase).translation,
					);
				},
			},
			doc,
		);
	}

	config = this.getConfig();

	constructor(
		private _translateService: TranslateService,
		private _phraseService: PhraseService,
		private _formService: FormService,
	) {
		super(phraseForm, _formService, _phraseService, 'phrase');

		this.setDocuments();
	}

	languageService = inject(LanguageService);
}
