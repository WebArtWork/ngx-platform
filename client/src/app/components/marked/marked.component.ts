import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

@Component({
	selector: 'page-marked',
	templateUrl: './marked.component.html',
	styleUrl: './marked.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkedSectionComponent {
	private readonly sanitizer = inject(DomSanitizer);

	/** Raw markdown content */
	readonly markdown = input.required<string>();

	/** Parsed + sanitized HTML */
	readonly html = computed<SafeHtml>(() => {
		const raw = marked.parse(this.markdown()) as string;
		const clean = DOMPurify.sanitize(raw);
		return this.sanitizer.bypassSecurityTrustHtml(clean);
	});
}
