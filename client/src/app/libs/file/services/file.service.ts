import { Injectable, inject } from '@angular/core';
import {
	CrudService,
	HttpService,
	FileService as WacomFileService,
} from 'wacom';
import { File } from '../interfaces/file.interface';

@Injectable({ providedIn: 'root' })
export class FileService extends CrudService<File> {
	private _file = inject(WacomFileService);
	private _http = inject(HttpService);

	files = this.getDocs();
	setFile!: (dataUrl: string) => void;

	constructor() {
		super({ name: 'file' });

		this._file.add({
			id: 'formPhoto',
			resize: 1920,
			cb: (file: any) => typeof file === 'string' && this.setFile?.(file),
		});

		this._file.add({
			id: 'formPhotos',
			multiple: true,
			resize: 1920,
			cb: (file: any) => typeof file === 'string' && this.setFile?.(file),
		});
	}

	/** Upload base64 to backend with optional container/name */
	async uploadBase64(
		dataUrl: string,
		container = 'general',
		name = '',
	): Promise<string> {
		return await new Promise<string>((resolve) => {
			this._http.post(
				'/api/file/photo',
				{ container, name, dataUrl },
				(url: string) => resolve(url),
			);
		});
	}
}
