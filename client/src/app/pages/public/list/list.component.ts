import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@layout/footer';
import { ListItemComponent } from './list-item/list-item.component';
import { items } from './list.const';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './list.component.html',
	imports: [FooterComponent, ListItemComponent],
})
export class ListComponent {
	readonly items = items;
}
