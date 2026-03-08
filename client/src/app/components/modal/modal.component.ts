import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { ModalContent } from './modal.interfaces';
import { ModalLayout } from './modal.types';

@Component({
	selector: 'page-component-modal',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class ModalComponent {
	readonly content = input.required<ModalContent>();

	readonly layout = input<ModalLayout>('dialog');

	readonly _sectionClass = computed(() => ({
		modal: true,
		[`modal--${this.layout()}`]: true,
	}));
}
