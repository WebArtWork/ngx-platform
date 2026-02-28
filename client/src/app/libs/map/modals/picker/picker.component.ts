import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LatLngLiteral } from '@lib/map';
import { MapComponent } from '@lib/map/components/map/map.component';

@Component({
	imports: [MapComponent],
	templateUrl: './picker.component.html',
	styleUrl: './picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerComponent {
	mapClick!: (latLng: LatLngLiteral) => void;
	close!: () => void;
}
