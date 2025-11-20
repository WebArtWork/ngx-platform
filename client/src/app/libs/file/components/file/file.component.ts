import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	TemplateRef,
	computed,
	effect,
	forwardRef,
	inject,
	input,
	model,
	output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalService } from '@lib/modal';
import { TranslatePipe } from 'src/app/modules/translate/pipes/translate.pipe';
import { VirtualFormService } from 'src/app/virtual-form.service';
import { FileService } from '../../services/file.service';
import { FileCropperComponent } from '../file-cropper/file-cropper.component';

export type WFileValue = string | string[] | null;

@Component({
	selector: 'ngx-file',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet, TranslatePipe],
	templateUrl: './file.component.html',
	styleUrl: './file.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FileComponent),
			multi: true,
		},
	],
})
export class FileComponent implements ControlValueAccessor {
	/* UI props */
	readonly label = input<string>('');
	readonly placeholder = input<string>('Select file');
	readonly disabled = input<boolean>(false);
	readonly clearable = input<boolean>(true);
	readonly accept = input<string>('*/*');
	readonly multiple = input<boolean>(false);
	readonly preview = input<boolean>(true);

	/* Crop */
	readonly cropWidth = input<number | null>(null);
	readonly cropHeight = input<number | null>(null);

	/* Custom templates */
	readonly t_item = input<TemplateRef<any>>();
	readonly t_empty = input<TemplateRef<any>>();

	/* Virtual Form */
	readonly formId = input<string | null>(null);
	readonly formKey = input<string | null>(null);

	/* Back-compat upload routing */
	readonly container = input<string>('general');
	readonly name = input<string>('');

	/* Model */
	readonly wModel = model<WFileValue>(null, { alias: 'wModel' });
	readonly wChange = output<WFileValue>();

	private _vf = inject(VirtualFormService);
	private _modal = inject(ModalService);
	private _fs = inject(FileService);

	private _onChange: (v: any) => void = () => {};
	private _onTouched: () => void = () => {};
	private _disabledCva = false;

	readonly isDisabled = computed(() => this.disabled() || this._disabledCva);
	readonly files = computed<string[]>(() => {
		const v = this.wModel();
		return Array.isArray(v) ? (v as string[]) : v ? [v as string] : [];
	});

	constructor() {
		// VF → model
		let syncing = false;
		effect(() => {
			const id = this.formId();
			const key = this.formKey();
			if (!id || !key) return;
			this._vf.registerField(id, key, null, []);
			const vfVal = this._vf.getValues(id)[key] ?? null;
			if (!syncing && !this._equal(vfVal, this.wModel())) {
				syncing = true;
				this.wModel.set(vfVal as WFileValue);
				syncing = false;
			}
		});

		// model → VF
		effect(() => {
			const id = this.formId();
			const key = this.formKey();
			if (!id || !key) return;
			const val = this.wModel();
			if (!this._equal(this._vf.getValues(id)[key], val)) {
				this._vf.setValue(id, key, (val ?? null) as WFileValue);
			}
		});

		// propagate to CVA + (wChange)
		effect(() => {
			const v = this.wModel();
			this._onChange(v);
			this.wChange.emit(v);
		});
	}

	triggerPick(input: HTMLInputElement) {
		if (!this.isDisabled()) input.click();
	}

	isImage(src: string): boolean {
		return /\.(png|jpe?g|webp|gif)(\?|$)/i.test(src ?? '');
	}

	async onPicked(input: HTMLInputElement) {
		const list = input.files;
		if (!list || !list.length) return;

		const doCrop = !!(this.cropWidth() && this.cropHeight());
		const urls: string[] = [];
		const container = this.container();
		const name = this.name();

		for (let i = 0; i < list.length; i++) {
			const f = list.item(i)!;
			const dataUrl = await fToDataURL(f);

			if (doCrop) {
				await new Promise<void>((resolve) => {
					this._modal.show({
						component: FileCropperComponent,
						dataUrl,
						width: this.cropWidth()!,
						height: this.cropHeight()!,
						uploadImage: (cropped: string) => {
							this._fs
								.uploadBase64(cropped, container, name)
								.then((url) => {
									urls.push(url);
									resolve();
								});
						},
					});
				});
			} else {
				const url = await this._fs.uploadBase64(
					dataUrl,
					container,
					name,
				);
				urls.push(url);
			}
		}

		const next = this.multiple()
			? [...this.files(), ...urls]
			: (urls[0] ?? null);
		this.wModel.set(next as WFileValue);
		input.value = '';
		this._onTouched();
	}

	removeAt(i: number) {
		if (!this.multiple()) {
			this.wModel.set(null);
			return;
		}
		const arr = [...this.files()];
		arr.splice(i, 1);
		this.wModel.set(arr.length ? arr : []);
	}

	clear() {
		this.wModel.set(this.multiple() ? [] : null);
	}

	// CVA
	writeValue(obj: WFileValue): void {
		if (!this._equal(this.wModel(), obj)) this.wModel.set(obj);
	}
	registerOnChange(fn: any): void {
		this._onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this._onTouched = fn;
	}
	setDisabledState(isDisabled: boolean): void {
		this._disabledCva = isDisabled;
	}

	private _equal(a: any, b: any) {
		return Array.isArray(a) || Array.isArray(b)
			? JSON.stringify(a) === JSON.stringify(b)
			: a === b;
	}
}

/* helpers */
function fToDataURL(file: File): Promise<string> {
	return new Promise((res, rej) => {
		const r = new FileReader();
		r.onload = () => res(r.result as string);
		r.onerror = rej;
		r.readAsDataURL(file);
	});
}
