import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
	templateUrl: './public.component.html',
	styleUrl: './public.component.scss',
	imports: [RouterOutlet, TopbarComponent],
})
export class PublicComponent {}
