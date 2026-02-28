import { Pipe, PipeTransform } from '@angular/core';
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
	transform(
		value: string | null | undefined,
		country: CountryCode = 'US',
	): string {
		const raw = String(value ?? '').trim();
		if (!raw) return '';
		const p = parsePhoneNumberFromString(raw, country);
		return p ? p.formatInternational() : raw;
	}
}
