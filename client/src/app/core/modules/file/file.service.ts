import { Injectable, inject } from '@angular/core';
import { FileService as WacomFileService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class FileService {
	private _file = inject(WacomFileService);

	setFile: (dataUrl: string) => void;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {
		this._file.add({
			id: 'formPhoto',
			// accept: 'image/*',
			resize: 1920,
			cb: (file: any) => {
				if (
					typeof file === 'string' &&
					typeof this.setFile === 'function'
				) {
					this.setFile(file);
				}
			}
		});

		this._file.add({
			id: 'formPhotos',
			// accept: 'image/*',
			multiple: true,
			resize: 1920,
			cb: (file: any) => {
				if (
					typeof file === 'string' &&
					typeof this.setFile === 'function'
				) {
					this.setFile(file);
				}
			}
		});
	}
}
