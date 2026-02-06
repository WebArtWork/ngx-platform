import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedComponent } from './marked.component';

describe('MarkedComponent', () => {
	let component: MarkedComponent;
	let fixture: ComponentFixture<MarkedComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MarkedComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MarkedComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
