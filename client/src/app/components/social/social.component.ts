import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { SocialContent } from './social.interfaces';
import { SocialLayout } from './social.types';

@Component({
	selector: 'page-component-social',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './social.component.html',
	styleUrl: './social.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class SocialComponent {
	readonly content = input.required<SocialContent>();

	readonly layout = input<SocialLayout>('testimonials');

	readonly _sectionClass = computed(() => ({
		social: true,
		[`social--${this.layout()}`]: true,
	}));
}
