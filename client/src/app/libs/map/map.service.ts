import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { HttpService } from 'wacom';
import { GeoAddress, PhotonFeatureDTO } from './map.interface';

@Injectable({ providedIn: 'root' })
export class MapService {
	private readonly _http = inject(HttpService);

	async getPredictions(input: string): Promise<GeoAddress[]> {
		const q = input.trim();
		if (!q) return [];

		const res = await firstValueFrom(
			this._http.get(`/api/proton?q=${encodeURIComponent(q)}&limit=7`),
		);

		return (res.features ?? [])
			.filter((f: PhotonFeatureDTO) => !!f?.geometry?.coordinates?.length)
			.map((f: PhotonFeatureDTO) => {
				const [lon, lat] = f.geometry.coordinates;
				return this._toGeoAddress(f, { lat, lng: lon });
			});
	}

	/**
	 * Click on map -> nearest address (reverse).
	 */
	async reverseGeocode(lat: number, lng: number): Promise<string | null> {
		const geo = await this.reverseGeoAddress(lat, lng);
		return geo?.address ?? null;
	}

	/**
	 * Reverse -> structured GeoAddress
	 */
	async reverseGeoAddress(
		lat: number,
		lng: number,
	): Promise<GeoAddress | null> {
		const res = await firstValueFrom(
			this._http.get(`/api/proton/reverse?lat=${lat}&lon=${lng}&limit=1`),
		);

		const f = res.features?.[0];
		if (!f) return null;

		return this._toGeoAddress(f, { lat, lng });
	}

	private _toGeoAddress(
		f: PhotonFeatureDTO,
		fallback: { lat: number; lng: number },
	): GeoAddress {
		const p = f.properties;
		const [lon, lat] = f.geometry?.coordinates ?? [
			fallback.lng,
			fallback.lat,
		];

		// Photon reverse часто повертає назву вулиці в `name`, а `street` лишає порожнім.
		const nameLooksLikeStreet = this._looksLikeStreet(p.name);

		let streetName = (p.street ?? p.name ?? '').trim();
		let house = (p.housenumber ?? '').trim();

		if (!streetName && nameLooksLikeStreet) {
			streetName = (p.name ?? '').trim();

			// інколи номер будинку "прилип" до name
			// приклад: "вулиця Шевченка 12"
			if (!house) {
				const m = streetName.match(
					/\s(\d+[A-Za-zА-Яа-яІіЇїЄєҐґ\-\/]*)\s*$/,
				);
				if (m?.[1]) {
					house = m[1];
					streetName = streetName
						.replace(/\s(\d+[A-Za-zА-Яа-яІіЇїЄєҐґ\-\/]*)\s*$/, '')
						.trim();
				}
			}
		}

		const street = [streetName, house].filter(Boolean).join(' ').trim();

		const address =
			this._formatAddress({
				...f,
				properties: {
					...p,
					// підставляємо нормалізовані значення, щоб address теж був консистентний
					street: streetName || p.street,
					housenumber: house || p.housenumber,
				},
			} as PhotonFeatureDTO) ||
			p.name ||
			`${lat.toFixed(6)}, ${lon.toFixed(6)}`;

		return {
			address,
			street,
			city: p.city ?? '',
			district: p.district ?? '',
			region: p.state ?? '',
			zip: p.postcode ?? '',
			country: p.country ?? '',
			lat,
			lng: lon,
		};
	}

	private _formatAddress(f: PhotonFeatureDTO): string {
		const p = f.properties;

		const line1 = [p.street, p.housenumber]
			.filter(Boolean)
			.join(' ')
			.trim();
		const line2 = [p.postcode, p.city].filter(Boolean).join(' ').trim();
		const line3 = [p.state, p.country].filter(Boolean).join(', ').trim();

		const name = (p.name ?? '').trim();
		const main =
			name && line1.includes(name)
				? line1
				: [name, line1].filter(Boolean).join(', ').trim();

		return [main, line2, line3].filter(Boolean).join(', ').trim();
	}

	private _looksLikeStreet(name?: string): boolean {
		const s = (name ?? '').trim().toLowerCase();
		if (!s) return false;

		// UA-ish street tokens (good enough for Kamianets / UA)
		return /^(вулиця|вул\.|проспект|просп\.|провулок|пров\.|бульвар|бул\.|площа|пл\.|набережна|шосе|алея)\b/i.test(
			s,
		);
	}
}
