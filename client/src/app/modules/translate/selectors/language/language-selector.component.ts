import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	model,
	output,
} from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { SelectButton } from 'src/app/libs/select/select.interface';
import { SelectValue } from 'src/app/libs/select/select.type';
import { TranslatePipe } from 'src/app/modules/translate/pipes/translate.pipe';
import { CrudComponent } from 'wacom';
import { languageForm } from '../../form/language.form';
import { LanguageFormcomponent } from '../../form/language/language.formcomponent';
import { Language } from '../../interfaces/language.interface';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '../../services/translate.service';

@Component({
	selector: 'language-selector',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent, TranslatePipe],
	templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent extends CrudComponent<
	LanguageService,
	Language,
	FormInterface
> {
	/* ==== Injects ==== */
	private _languageService = inject(LanguageService);
	private _form = inject(FormService);

	/* ==== Inputs ==== */
	readonly searchable = input<boolean>(true);
	readonly clearable = input<boolean>(true);
	readonly disabled = input<boolean>(false);
	readonly isMutatable = input<boolean>(false);

	/** external model (same name as wselect) */
	readonly wModel = model<SelectValue>(null, { alias: 'wModel' });

	/** change event */
	readonly wChange = output<SelectValue>();

	/** computed placeholder */
	readonly placeholder = computed(
		() =>
			(this.documents().length
				? 'Select language'
				: 'Create new language') + '...',
	);

	/** buttons (only visible if mutatable = true) */
	readonly buttons = computed<SelectButton[]>(() => {
		if (!this.isMutatable()) return [];

		const hasCurrent = !!this._languageService.language()?._id;

		return [
			{
				icon: hasCurrent ? 'edit' : '',
				click: () => this.mutate(true),
			},
			{
				icon: hasCurrent ? 'delete' : '',
				click: () => this.deleteCurrent(),
			},
			{
				icon: 'add',
				click: () => this.mutate(false),
			},
		];
	});

	constructor(_lang: LanguageService) {
		super(
			LanguageFormcomponent,
			inject(FormService),
			inject(TranslateService),
			_lang,
			'language',
		);

		this.setDocuments();
	}

	mutate(current = true) {
		console.log('called');

		const selectedId = (this.wModel() as string | null) ?? null;
		const docSig = current
			? this.documents().find((d) => d()._id === selectedId)
			: undefined;

		this._form.modal<Language>(
			languageForm,
			{
				label: current ? 'Update' : 'Create',
				click: (updated) => {
					return console.log(updated);

					if (current && this._languageService.language()) {
						this._languageService.update({
							...(this._languageService.language() as Language),
							...(updated as Partial<Language>),
						});
					} else {
						this._languageService
							.create(updated as Language)
							.subscribe((l) => {
								this._languageService.setLanguage(l);
								this.wModel.set(l._id as SelectValue);
								this.wChange.emit(l._id as SelectValue);
							});
					}
				},
			},
			docSig?.(),
		);
	}

	private deleteCurrent() {
		const curr = this._languageService.language() as Language | null;
		if (!curr) return;
		this._languageService.delete(curr);
		this._languageService.nextLanguage();
	}
}
