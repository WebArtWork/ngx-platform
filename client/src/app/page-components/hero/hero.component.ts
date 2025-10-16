import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from 'src/app/libs/button/button.component';

@Component({
	selector: 'page-hero',
	imports: [ButtonComponent],
	templateUrl: './hero.component.html',
	styleUrl: './hero.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
