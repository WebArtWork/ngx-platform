import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { MemberContent } from './member.interfaces';
import { MemberLayout } from './member.types';

@Component({
	selector: 'page-component-member',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './member.component.html',
	styleUrl: './member.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class MemberComponent {
	readonly content = input.required<MemberContent>();

	readonly layout = input<MemberLayout>('profile');

	readonly _sectionClass = computed(() => ({
		member: true,
		[`member--${this.layout()}`]: true,
	}));
}
