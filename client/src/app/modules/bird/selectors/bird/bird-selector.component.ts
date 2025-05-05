import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BirdService } from '../../services/bird.service';
import { Bird } from '../../interfaces/bird.interface';

@Component({
	selector: 'bird-selector',
	templateUrl: './bird-selector.component.html',
	styleUrls: ['./bird-selector.component.scss'],
	imports: [SelectModule],
})
export class BirdSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Bird[] {
		return this._birdService.birds;
	}

	constructor(private _birdService: BirdService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
