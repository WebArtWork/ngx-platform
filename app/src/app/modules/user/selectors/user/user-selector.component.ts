import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges
} from '@angular/core';
import { SelectModule } from '../../../../libs/select/select.module';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'user-selector',
	templateUrl: './user-selector.component.html',
	styleUrls: ['./user-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value = '';

	@Output() onChange = new EventEmitter();

	constructor(public us: UserService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
