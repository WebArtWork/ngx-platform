import { ChangeDetectionStrategy, Component, input, output, inject, Signal } from '@angular/core';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { TranslatePipe } from 'src/app/modules/translate/pipes/translate.pipe';
import { FileService } from '../../services/file.service';
import { File } from '../../interfaces/file.interface';

@Component({
  selector: 'file-selector',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectComponent, TranslatePipe],
  templateUrl: './file-selector.component.html',
})
export class FileSelectorComponent {
  private _files = inject(FileService);

  readonly wModel = input<string | null>(null, { alias: 'wModel' });
  readonly wChange = output<string | null>();

  readonly items: Signal<File[]> = this._files.getDocs();
}
