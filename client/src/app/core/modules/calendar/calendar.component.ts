import {
	Component,
	HostListener,
	Output,
	Input,
	EventEmitter
} from '@angular/core';
import { CalendarDate } from './calendar.interface';
import { ButtonComponent } from '../button/button.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'wcalendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    imports: [ButtonComponent, NgFor, NgIf]
})
export class CalendarComponent {
	@Input() eventsByDate: Record<string, CalendarDate[]> = {};

	@Output() todayClicked = new EventEmitter<string>();

	@Output() dateClicked = new EventEmitter<string>();

	@Output() createEvent = new EventEmitter<CalendarDate>();

	@Output() updateEvent = new EventEmitter<CalendarDate>();

	readonly dayTitle: Record<number, string> = {
		1: 'ПН',
		2: 'ВТ',
		3: 'СР',
		4: 'ЧТ',
		5: 'ПТ',
		6: 'СБ',
		7: 'НД'
	};
	readonly monthTitle: Record<number, string> = {
		0: 'Січень',
		1: 'Лютий',
		2: 'Березень',
		3: 'Квітень',
		4: 'Травень',
		5: 'Червень',
		6: 'Липень',
		7: 'Серпень',
		8: 'Вересень',
		9: 'Жовтень',
		10: 'Листопад',
		11: 'Грудень'
	};
	constructor() {
		this._onMonthChange();

		this.onResize();
	}
	// Calendar management
	currentMonth = new Date().getMonth();
	currentYear = new Date().getFullYear();
	previousMonth: number;
	previousYear: number;
	nextMonth: number;
	nextYear: number;
	setNow(): void {
		this.currentMonth = new Date().getMonth();

		this.currentYear = new Date().getFullYear();

		this._onMonthChange();

		this.selectedDate = this.date({
			year: this.currentYear,
			month: this.currentMonth + 1,
			day: new Date().getDate()
		});
	}
	setPreviousMonth(): void {
		this.currentMonth--;

		if (this.currentMonth === -1) {
			this.currentMonth = 11;

			this.currentYear--;
		}

		this._onMonthChange();
	}
	setNextMonth(): void {
		this.currentMonth++;

		if (this.currentMonth === 12) {
			this.currentMonth = 0;

			this.currentYear++;
		}

		this._onMonthChange();
	}
	weeksInMonth: number[] = [];
	startDay = 0; // date of previous month, first in first row, -1
	skipDays = 0; // skipped days on first row
	keepDays = 0; // days on latest row
	private _onMonthChange(): void {
		if (this.currentMonth === 11) {
			this.previousMonth = 10;

			this.previousYear = this.currentYear;

			this.nextMonth = 0;

			this.nextYear = this.currentYear + 1;
		} else if (this.currentMonth === 0) {
			this.previousMonth = 11;

			this.previousYear = this.currentYear - 1;

			this.nextMonth = 1;

			this.nextYear = this.currentYear;
		} else {
			this.previousMonth = this.currentMonth - 1;

			this.previousYear = this.currentYear;

			this.nextMonth = this.currentMonth + 1;

			this.nextYear = this.currentYear;
		}

		const firstDayOfMonth = new Date(
			this.currentYear,
			this.currentMonth,
			1
		);

		const firstWeek = this.getWeekNumber(firstDayOfMonth);

		this.weeksInMonth = [];

		const weeks = this.getWeeksInMonth(this.currentMonth, this.currentYear);

		for (let i = 0; i < weeks; i++) {
			this.weeksInMonth.push(firstWeek + i);
		}

		this.skipDays =
			(firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay()) - 1;

		const daysInPreviousMonth =
			this.currentMonth > 1
				? this.getDaysInMonth(this.currentMonth - 1, this.currentYear)
				: this.getDaysInMonth(11, this.currentYear - 1);

		const daysInMonth = this.getDaysInMonth(
			this.currentMonth,
			this.currentYear
		);

		this.startDay = daysInPreviousMonth - this.skipDays;

		this.keepDays = (daysInMonth + this.skipDays) % 7;

		if (
			!this.selectedDate ||
			this.selectedDate.split('.')[0] !== this.currentYear.toString() ||
			this.selectedDate.split('.')[1] !==
				(this.currentMonth - 1).toString()
		) {
			this.selectedDate = '';
		}
	}
	isMobile: boolean;
	@HostListener('window:resize') onResize(): void {
		this.isMobile = window.innerWidth <= 768;
	}
	toDate(year: number, month: number, day: number, join = '.'): string {
		return `${year}${join}${month}${join}${day}`;
	}
	selectedDate: string = localStorage.getItem('travel_selectedDate') || '';
	onClick(date: string): void {
		this.selectedDate = date;

		localStorage.setItem('travel_selectedDate', date);

		this.dateClicked.emit(
			this.date({
				year: Number(date.split('.')[0]),
				month: Number(date.split('.')[1]) + 1,
				day: Number(date.split('.')[2])
			})
		);

		this.createEvent.emit({
			year: Number(date.split('.')[0]),
			month: Number(date.split('.')[1]),
			day: Number(date.split('.')[2])
		});
	}

	eventClicked(date: CalendarDate): void {
		this.selectedDate = this.date(date);

		this.updateEvent.emit(date);
	}

	/* move to wacom */
	/**
	 * Returns the week number of a given date within the same calendar year.
	 *
	 * - Week 1 starts on January 1st.
	 * - Weeks start on Sunday (based on `getDay()`, where Sunday = 0).
	 * - The function counts full 7-day weeks from the beginning of the year,
	 *   adjusting for the day of the week the year starts on.
	 *
	 * @param date - The date for which to calculate the week number.
	 * @returns The calendar year week number (1-based).
	 */
	getWeekNumber(date: Date): number {
		const startOfYear = new Date(date.getFullYear(), 0, 1);
		const diffInMs = date.getTime() - startOfYear.getTime();
		const days = Math.floor(diffInMs / 86400000);
		const week = Math.floor((days + startOfYear.getDay()) / 7) + 1;
		return week;
	}

	getWeeksInMonth(month: number, year: number): number {
		const firstDayOfMonth = new Date(year, month, 1);

		const lastDayOfMonth = new Date(year, month + 1, 0);

		// Get ISO week numbers for the first and last day of the month
		const firstWeek = this.getWeekNumber(firstDayOfMonth);

		let lastWeek = this.getWeekNumber(lastDayOfMonth);

		// Special case: when January 1st is in the last week of the previous year
		if (firstWeek > lastWeek) {
			lastWeek = this.getWeekNumber(new Date(year, 11, 31)); // Get week of the last day of the year
		}

		return lastWeek - firstWeek + 1;
	}
	getDaysInMonth(month: number, year: number): number {
		return new Date(year, month + 1, 0).getDate();
	}

	date(ap: CalendarDate, join = '.'): string {
		return `${ap.year}${join}${ap.month}${join}${ap.day}`;
	}
}
