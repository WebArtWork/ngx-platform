import { Component, Input } from '@angular/core';

@Component({
	selector: 'icon-spider',
	standalone: true,
	templateUrl: './spider.component.html',
	styleUrl: './spider.component.scss',
	host: {
		class: 'spider',
		'[style.--spider-w]': 'width || null',
		'[style.--spider-h]': 'height || null',
		'[style.--spider-start]': 'start',
		'[style.--spider-end]': 'end',
	},
})
export class SpiderComponent {
	/** CSS length, e.g. "200px", "40vw". If omitted, fills container width. */
	@Input() width?: string;
	/** CSS length for height; if omitted, keeps aspect ratio via width. */
	@Input() height?: string;
}
