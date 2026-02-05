import {
	ChangeDetectionStrategy,
	Component,
	computed,
	signal,
} from '@angular/core';
import { ButtonComponent } from '@lib/button';
import { GalleryImage } from './gallery.interface';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.scss',
	imports: [ButtonComponent],
})
export class GalleryComponent {
	readonly images = signal<GalleryImage[]>([
		{
			id: 'default-1',
			src: '/assets/default.png',
			title: 'Default preview',
			alt: 'Default image preview',
		},
		{
			id: 'logo-1',
			src: '/assets/logo.png',
			title: 'Brand logo',
			alt: 'Logo image preview',
		},
		{
			id: 'default-2',
			src: '/assets/default.png',
			title: 'Default preview',
			alt: 'Default image preview',
		},
		{
			id: 'logo-2',
			src: '/assets/logo.png',
			title: 'Brand logo',
			alt: 'Logo image preview',
		},
		{
			id: 'default-3',
			src: '/assets/default.png',
			title: 'Default preview',
			alt: 'Default image preview',
		},
		{
			id: 'logo-3',
			src: '/assets/logo.png',
			title: 'Brand logo',
			alt: 'Logo image preview',
		},
	]);

	readonly activeId = signal<string>(this.images()[0]?.id ?? '');

	readonly activeIndex = computed(() => {
		const list = this.images();
		const idx = list.findIndex((x) => x.id === this.activeId());
		return idx >= 0 ? idx : 0;
	});

	readonly activeImage = computed(() => {
		const list = this.images();
		return list[this.activeIndex()] ?? list[0];
	});

	setActive(id: string): void {
		this.activeId.set(id);
	}
}
