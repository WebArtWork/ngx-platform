import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { product } from './profile.const';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './profile.component.html',
	imports: [FooterComponent],
})
export class ProfileComponent {
	readonly product = product;
}
