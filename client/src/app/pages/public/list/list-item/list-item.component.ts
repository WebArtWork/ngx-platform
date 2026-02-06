import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Item } from '../list.interface';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
})
export class ListItemComponent {
	readonly item = input.required<Item>();
}
