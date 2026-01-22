import {
	ChangeDetectionStrategy,
	Component,
	input,
	signal,
} from '@angular/core';
import { FaqContent } from './faq.interfaces';

@Component({
	selector: 'page-component-faq',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './faq.component.html',
	styleUrl: './faq.component.scss',
})
export class FaqSectionComponent {
	readonly content = input.required<FaqContent>();

	readonly openIndex = signal<number | null>(null);

	toggle(index: number): void {
		this.openIndex.update((current) => (current === index ? null : index));
	}
}
