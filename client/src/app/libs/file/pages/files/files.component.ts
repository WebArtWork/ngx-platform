import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'node_modules/rxjs/dist/types';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TableComponent } from 'src/app/libs/table/table.component';
import { TranslateService } from 'src/app/libs/translate/translate.service';
import { AlertService, CoreService } from 'wacom';
import { fileFormComponents } from '../../formcomponents/file.formcomponents';
import { File } from '../../interfaces/file.interface';
import { FileService } from '../../services/file.service';

@Component({
	templateUrl: './files.component.html',
	imports: [TableComponent]
})
export class FilesComponent {
	private _translate = inject(TranslateService);
	private _fileService = inject(FileService);
	private _clipboard = inject(Clipboard);
	private _alert = inject(AlertService);
	private _form = inject(FormService);
	private _core = inject(CoreService);

	columns = ['img', 'url'];

	form: FormInterface = this._form.prepareForm(fileFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._fileService.setPerPage.bind(this._fileService),
		allDocs: false,
		create: (): void => {
			this._form.modal<File>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as File);

					await firstValueFrom(
						this._fileService.create(created as File)
					);

					this.setRows();
				}
			});
		},
		delete: (doc: File): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this file?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._fileService.delete(doc));

							this.setRows();
						}
					}
				]
			});
		}
	};

	rows: File[] = [];

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {
		this.setRows();
	}

	copy(text: string): void {
		this._clipboard.copy(text);

		this._alert.info({
			text: 'Url has been copied'
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._fileService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _preCreate(file: File): void {
		delete file.__created;
	}
}
