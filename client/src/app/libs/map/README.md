[![Angular v21+](https://img.shields.io/badge/angular-v21%2B-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Map (`ngx-map`)

A small Angular **v21+** map toolkit built on **@angular/google-maps** with:

- `<lib-map>`: a Google Map wrapper with markers, click events, and an optional “click-to-place” marker
- `<lib-address>`: an address search input with predictions + a “pick from map” modal
- `MapService`: Photon-powered forward/reverse geocoding via your backend (`/api/proton`)

Designed for standalone components, OnPush, and signal-first APIs.

---

## Installation

```bash
waw add ngx-map
```

> This library expects **Google Maps JS API** to be configured in your app (via `@angular/google-maps`) and a backend route for Photon (see “Backend API” below).

---

## Exports

```ts
export * from './components/address/address.component';
export * from './components/map/map.component';
export * from './map.interface';
export * from './map.service';
```

Import what you need:

```ts
import { MapComponent, AddressComponent, MapService } from '@lib/map';
```

---

## `<lib-map>` component

### Basic usage

```html
<lib-map [height]="'360px'" [zoom]="13"></lib-map>
```

### Inputs

| Input                | Type                    | Default                          | Notes                                                              |
| -------------------- | ----------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `center`             | `LatLngLiteral`         | `{ lat: 50.4501, lng: 30.5234 }` | Default center is **Kyiv**.                                        |
| `zoom`               | `number`                | `13`                             | Standard Google Maps zoom.                                         |
| `height`             | `string`                | `'360px'`                        | Canvas height.                                                     |
| `width`              | `string`                | `'100%'`                         | Canvas width.                                                      |
| `markers`            | `LibMapMarker[]`        | `[]`                             | Markers to render.                                                 |
| `disableDefaultUI`   | `boolean`               | `false`                          | Passed to map options.                                             |
| `clickableIcons`     | `boolean`               | `false`                          | Passed to map options.                                             |
| `placeMarkerOnClick` | `boolean`               | `false`                          | When true, clicking the map places/updates a local “click marker”. |
| `clickMarker`        | `LatLngLiteral \| null` | `null`                           | Allows controlling the click marker externally (kept in sync).     |

### Outputs

| Output           | Type            | When                                 |
| ---------------- | --------------- | ------------------------------------ |
| `mapClick`       | `LatLngLiteral` | Fires on any map click (raw coords). |
| `markerSelected` | `LibMapMarker`  | Fires when a marker is clicked.      |

### Markers model

```ts
export interface LibMapMarker {
	id: string;
	position: LatLngLiteral;
	title?: string;
	label?: string;
	draggable?: boolean;
	iconUrl?: string;
}
```

### Click-to-place marker behavior

When `placeMarkerOnClick` is enabled:

- A special marker (id: `__click_marker__`) is added/updated at click location
- The click location becomes the “resolved center” for next opens
- The last center is persisted in `localStorage` under `waw_map_last_center`

The component also attempts to start from the user’s geolocation (if allowed), otherwise falls back to:

1. `localStorage` saved center → 2) provided `center` input.

---

## `<lib-address>` component

An address search field that:

- uses `<winput>` for the UI
- shows a predictions dropdown while focused
- supports selecting a location from a map modal (pin icon)

### Basic usage (two-way address model)

```html
<lib-address
	label="Address"
	placeholder="Search address..."
	[(address)]="address"
	(wChange)="onAddress($event)"
></lib-address>
```

> `address` is a `GeoAddress` model. `wChange` emits the selected/confirmed address.

### Inputs

| Input         | Type                 | Default               |
| ------------- | -------------------- | --------------------- |
| `label`       | `string`             | `''`                  |
| `placeholder` | `string`             | `'Search address...'` |
| `address`     | `GeoAddress` (model) | empty address object  |

### Outputs

| Output    | Type         | When                                                     |
| --------- | ------------ | -------------------------------------------------------- |
| `wChange` | `GeoAddress` | When a prediction is picked or a map location is chosen. |

### UX details

- Predictions show only while focused
- Blur closes dropdown with a short delay (so pointer selection works)
- `Escape` closes dropdown
- While fetching predictions, a small loading icon is shown inside the input

---

## `MapService`

`MapService` talks to your backend Photon proxy endpoints and returns structured `GeoAddress`.

### Forward search (predictions)

```ts
const results = await mapService.getPredictions('Shevchenka 12');
```

- Returns up to `limit=7` results (as implemented)
- Filters invalid features and normalizes street/house number when Photon returns street in `name`

### Reverse geocoding

```ts
const addressText = await mapService.reverseGeocode(lat, lng);
const geo = await mapService.reverseGeoAddress(lat, lng);
```

---

## Types

```ts
export interface GeoAddress {
	address: string;
	street: string;
	city: string;
	district: string;
	region: string;
	zip: string;
	country: string;
	lat: number;
	lng: number;
}

export interface LatLngLiteral extends google.maps.LatLngLiteral {}
```

Photon DTOs are also exported via `map.interface.ts` for typing backend responses.

---

## Backend API

This library expects your app backend to expose Photon endpoints:

### `GET /api/proton?q=<query>&limit=7`

Returns a Photon-like GeoJSON response:

- `{ features: PhotonFeatureDTO[] }`

### `GET /api/proton/reverse?lat=<lat>&lon=<lng>&limit=1`

Returns a single nearest feature in the same format.

> The library uses `HttpService` from `wacom` and `firstValueFrom()` internally.

---

## Styling

- `<lib-map>`: `.waw-map` token-based container (border, radius, shadow)
- `<lib-address>`: `.waw-address` dropdown with token-based surfaces and hover

All styles rely on the global design tokens:

- surfaces: `--c-bg-primary/secondary/tertiary`
- borders/shadows: `--c-border`, `--shadow-sm`, `--shadow-md`
- text: `--c-text-primary`, `--c-text-muted`
- radius/spacing/motion: `--radius`, `--radius-card`, `--sp-*`, `--motion-fast`, `--easing`

---

## License

MIT © 2026 Web Art Work
