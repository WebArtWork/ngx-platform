import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	input,
	output,
	signal,
} from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { LatLngLiteral, LibMapMarker } from '../../map.interface';

const LAST_CENTER_KEY = 'waw_map_last_center';
@Component({
	selector: 'lib-map',
	imports: [CommonModule, GoogleMap, MapMarker],
	templateUrl: './map.component.html',
	styleUrl: './map.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
	// Inputs
	center = input<LatLngLiteral>({ lat: 50.4501, lng: 30.5234 }); // default: Kyiv
	zoom = input<number>(13);
	height = input<string>('360px');
	width = input<string>('100%');
	markers = input<LibMapMarker[]>([]);
	disableDefaultUI = input<boolean>(false);
	clickableIcons = input<boolean>(false);

	// NEW: click-to-place marker toggle
	placeMarkerOnClick = input<boolean>(false);

	// NEW: allow placing/updating the click-marker from outside
	clickMarker = input<LatLngLiteral | null>(null);

	// Output: marker click with reverse-geocoded address
	markerSelected = output<LibMapMarker>();

	// Output: raw map click coords
	mapClick = output<LatLngLiteral>();

	// Local click-marker state (created by map click or external input)
	private readonly clickMarkerLocal = signal<LatLngLiteral | null>(null);
	private readonly CLICK_MARKER_ID = '__waw_click_marker__';

	// NEW: user location override for map start center
	private readonly userCenter = signal<LatLngLiteral | null>(null);
	readonly centerResolved = computed<LatLngLiteral>(
		() => this.userCenter() ?? this.center(),
	);

	// Map options (computed from inputs)
	readonly options = computed<google.maps.MapOptions>(() => ({
		disableDefaultUI: this.disableDefaultUI(),
		clickableIcons: this.clickableIcons(),
	}));

	// Merge user markers + optional click-marker
	readonly markersResolved = computed<LibMapMarker[]>(() => {
		const base = this.markers();
		const pos = this.clickMarkerLocal();

		if (!pos) return base;

		const clickMarker: LibMapMarker = {
			id: this.CLICK_MARKER_ID,
			position: pos,
			title: 'Selected location',
			draggable: false,
		};

		return base.some((m) => m.id === this.CLICK_MARKER_ID)
			? base.map((m) => (m.id === this.CLICK_MARKER_ID ? clickMarker : m))
			: [...base, clickMarker];
	});

	constructor() {
		effect(() => {
			// keep click marker in sync with input when provided
			this.clickMarkerLocal.set(this.clickMarker());
		});

		effect(() => {
			// dev sanity: duplicate IDs
			const ids = this.markersResolved().map((m) => m.id);
			if (ids.length !== new Set(ids).size) {
				// eslint-disable-next-line no-console
				console.warn('[lib-map] Duplicate marker ids detected:', ids);
			}
		});

		// If user accepts browser prompt, start map from their current location
		this.tryResolveUserLocation();
	}

	onMapClick(ev: google.maps.MapMouseEvent): void {
		const ll = ev.latLng?.toJSON();
		if (!ll) return;

		this.mapClick.emit(ll);

		if (this.placeMarkerOnClick()) {
			this.clickMarkerLocal.set(ll);

			// memo + use it as center for next opens
			this.userCenter.set(ll);
			this._persistUserCenter(ll);
		}
	}

	markerOptions(m: LibMapMarker): google.maps.MarkerOptions {
		return {
			title: m.title,
			label: m.label,
			draggable: m.draggable ?? false,
			icon: m.iconUrl ? { url: m.iconUrl } : undefined,
		};
	}

	private tryResolveUserLocation(): void {
		if (typeof localStorage === 'undefined') return;
		// 1) Load last saved center first (if any)
		try {
			const raw = localStorage.getItem(LAST_CENTER_KEY);
			if (raw) {
				const saved = JSON.parse(raw) as LatLngLiteral;
				if (
					typeof saved?.lat === 'number' &&
					typeof saved?.lng === 'number'
				) {
					this.userCenter.set(saved);
				}
			}
		} catch {
			// ignore
		}

		// 2) Then try browser geolocation (if allowed) to update + persist
		if (typeof navigator === 'undefined') return;
		if (!('geolocation' in navigator)) return;

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const center: LatLngLiteral = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				};
				this.userCenter.set(center);
				this._persistUserCenter(center);
			},
			() => {
				// ignore (denied/unavailable/timeout) − keep saved center or default center()
			},
			{
				enableHighAccuracy: true,
				timeout: 8000,
				maximumAge: 60_000,
			},
		);
	}

	private _persistUserCenter(center: LatLngLiteral) {
		if (typeof localStorage === 'undefined') return;
		try {
			localStorage.setItem(LAST_CENTER_KEY, JSON.stringify(center));
		} catch {
			// ignore (storage blocked / SSR / quota)
		}
	}
}
