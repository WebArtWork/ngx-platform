import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TestService } from '../../services/test.service';
import { Test } from '../../interfaces/test.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { testFormComponents } from '../../formcomponents/test.formcomponents';

@Component({
	templateUrl: './tests.component.html',
	styleUrls: ['./tests.component.scss'],
	standalone: false,
})
export class TestsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('test', testFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Test>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Test);

					this._testService.create(created as Test);

					close();
				},
			});
		},
		update: (doc: Test): void => {
			this._form
				.modal<Test>(this.form, [], doc)
				.then((updated: Test) => {
					this._core.copy(updated, doc);

					this._testService.update(doc);
				});
		},
		delete: (doc: Test): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this test?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._testService.delete(doc);
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Test): void => {
					this._form.modalUnique<Test>('test', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	get rows(): Test[] {
		return this._testService.tests;
	}

	constructor(
		private _translate: TranslateService,
		private _testService: TestService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Test>(create ? [] : this.rows)
				.then((tests: Test[]) => {
					if (create) {
						for (const test of tests) {
							this._preCreate(test);

							this._testService.create(test);
						}
					} else {
						for (const test of this.rows) {
							if (
								!tests.find(
									(localTest) => localTest._id === test._id
								)
							) {
								this._testService.delete(test);
							}
						}

						for (const test of tests) {
							const localTest = this.rows.find(
								(localTest) => localTest._id === test._id
							);

							if (localTest) {
								this._core.copy(test, localTest);

								this._testService.update(localTest);
							} else {
								this._preCreate(test);

								this._testService.create(test);
							}
						}
					}
				});
		};
	}

	private _preCreate(test: Test): void {
		delete test.__created;
	}
}
