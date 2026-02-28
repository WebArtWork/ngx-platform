import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	model,
	output,
	signal,
} from '@angular/core';
import { InputComponent, InputValue } from '@lib/input';
import { GeoAddress } from '@lib/map/map.interface';
import { MapService } from '@lib/map/map.service';
import { PickerComponent } from '@lib/map/modals/picker/picker.component';
import { ModalService } from '@lib/modal';
import { CoreService } from 'wacom';
import { LatLngLiteral } from '../../map.interface';

@Component({
	selector: 'lib-address',
	templateUrl: './address.component.html',
	styleUrl: './address.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [InputComponent],
})
export class AddressComponent {
	private readonly _mapService = inject(MapService);
	private readonly _modalService = inject(ModalService);
	private readonly _coreService = inject(CoreService);

	label = input<string>('');
	placeholder = input<string>('Search address...');

	address = model<GeoAddress>({
		address: '',
		street: '',
		city: '',
		district: '',
		region: '',
		zip: '',
		country: '',
		lat: 0,
		lng: 0,
	});
	wChange = output<GeoAddress>();

	readonly search = signal('');
	readonly loading = signal(false);
	readonly predictions = signal<GeoAddress[]>([]);
	readonly focused = signal(false);

	private _blurTimer: ReturnType<typeof setTimeout> | null = null;

	icons = [
		{
			icon: 'place',
			click: () => {
				this._modalService.show({
					component: PickerComponent,
					mapClick: async (latLng: LatLngLiteral) => {
						const geo = await this._mapService.reverseGeoAddress(
							latLng.lat,
							latLng.lng,
						);

						this.address.set(
							geo ?? {
								address: `${latLng.lat.toFixed(6)}, ${latLng.lng.toFixed(6)}`,
								street: '',
								city: '',
								district: '',
								region: '',
								zip: '',
								country: '',
								lat: latLng.lat,
								lng: latLng.lng,
							},
						);

						this.search.set(this.address().address);
						this.focused.set(false);
						this.predictions.set([]);

						this.wChange.emit(this.address());
					},
				});
			},
		},
	];

	onFocus() {
		if (this._blurTimer) clearTimeout(this._blurTimer);
		this.focused.set(true);
	}

	onBlur() {
		// delay so mousedown on prediction can run first
		this._blurTimer = setTimeout(() => {
			this.focused.set(false);
			this.predictions.set([]);
		}, 120);
	}

	onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			this.predictions.set([]);
			this.focused.set(false);
		}
	}

	async onSearchChange(value: InputValue) {
		this._coreService.afterWhile(async () => {
			this.search.set((value ?? '') as string);

			if (!this.search().trim()) {
				this.predictions.set([]);
				return;
			}

			// Don’t fetch/show predictions when not focused
			if (!this.focused()) {
				this.predictions.set([]);
				return;
			}

			this.loading.set(true);
			try {
				const results = await this._mapService.getPredictions(
					this.search(),
				);
				// still focused by the time results return?
				this.predictions.set(this.focused() ? results : []);
			} finally {
				this.loading.set(false);
			}

			const address = this.address();
			if (address.lat && address.lng) {
				address.address = this.search();
				this.address.set(address);
				this.wChange.emit(address);
			}
		});
	}

	onPick(address: GeoAddress) {
		// cancel pending blur close
		if (this._blurTimer) clearTimeout(this._blurTimer);

		this.address.set(address);
		this.search.set(address.address);
		this.predictions.set([]);
		this.focused.set(false);
		this.loading.set(false);

		this.wChange.emit(address);
	}
}
