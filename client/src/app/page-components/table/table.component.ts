import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

}
