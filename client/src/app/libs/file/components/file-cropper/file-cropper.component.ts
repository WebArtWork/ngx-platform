import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lib/button';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
	selector: 'app-file-cropper',
	templateUrl: './file-cropper.component.html',
	styleUrl: './file-cropper.component.scss',
	imports: [ImageCropperComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileCropperComponent {
	// Provided by modal
	close: () => void = () => {};
	uploadImage: (croppedDataUrl: string) => void = () => {};

	// Cropper config
	maintainAspectRatio = true;
	aspectRatio = 1;

	// Data from caller
	dataUrl = '';
	width = 0;
	height = 0;

	// Result
	croppedDataUrl = '';

	imageCropped(event: ImageCroppedEvent): void {
		this.croppedDataUrl = (event.base64 as string) || '';
	}
}
