import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TestimonialsContent } from './testimonials.interfaces';

@Component({
	selector: 'page-component-testimonials',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './testimonials.component.html',
})
export class TestimonialsSectionComponent {
	readonly content = input.required<TestimonialsContent>();
}
