import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
	templateUrl: './public.component.html',
	styleUrl: './public.component.scss',
	imports: [RouterLinkActive, RouterLink, RouterOutlet],
})
export class PublicComponent {}
