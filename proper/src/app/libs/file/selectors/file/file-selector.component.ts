import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	inject,
} from '@angular/core';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { File } from '../../interfaces/file.interface';
import { FileService } from '../../services/file.service';

@Component({
	selector: 'file-selector',
	templateUrl: './file-selector.component.html',
	imports: [SelectComponent],
})
export class FileSelectorComponent implements OnChanges {
	private _fileService = inject(FileService);

	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): File[] {
		return this._fileService.files;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
