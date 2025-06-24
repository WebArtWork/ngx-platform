import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	inject
} from '@angular/core';
import { Test, TestService } from 'src/app/core/services/test.service';

@Component({
	selector: 'test-selector',
	templateUrl: './test-selector.component.html',
	styleUrls: ['./test-selector.component.scss']
})
export class TestSelectorComponent implements OnChanges {
	private _testService = inject(TestService);

	@Input() value: string;

	@Output() onChange = new EventEmitter();

	get items(): Test[] {
		return this._testService.tests;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
