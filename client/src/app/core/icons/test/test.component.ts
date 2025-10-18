import { Component, Input } from '@angular/core';

@Component({
	selector: 'test-icon',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
	standalone: false,
})
export class TestComponent {
	@Input() color = 'black';
}
