import { Component } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { ButtonComponent } from 'src/app/libs/button/button.component';

@Component({
	selector: 'app-file-cropper',
	templateUrl: './file-cropper.component.html',
	imports: [ImageCropperComponent, ButtonComponent],
})
export class FileCropperComponent {
	close!: () => void;
	maintainAspectRatio = true;
	aspectRatio = 1;
	croppedDataUrl!: string;
	dataUrl!: string;
	width!: number;
	height!: number;
	uploadImage!: (croppedDataUrl: string) => void;

	imageCropped(event: ImageCroppedEvent): void {
		this.croppedDataUrl = event.base64 as string;
	}
}
