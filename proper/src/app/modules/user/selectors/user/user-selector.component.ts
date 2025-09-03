import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	inject,
} from '@angular/core';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent],
	selector: 'user-selector',
	templateUrl: './user-selector.component.html',
	styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnChanges {
	us = inject(UserService);

	@Input() value: string;

	@Output() onChange = new EventEmitter();

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
