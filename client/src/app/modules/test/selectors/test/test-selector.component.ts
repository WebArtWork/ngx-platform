import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TestService } from '../../services/test.service';
import { Test } from '../../interfaces/test.interface';

@Component({
	selector: 'test-selector',
	templateUrl: './test-selector.component.html',
	styleUrls: ['./test-selector.component.scss'],
	imports: [SelectModule],
})
export class TestSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Test[] {
		return this._testService.tests;
	}

	constructor(private _testService: TestService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
