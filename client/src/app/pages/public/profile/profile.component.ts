import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './profile.component.html',
	imports: [FooterComponent],
})
export class ProfileComponent {}
