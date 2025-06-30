import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './public.component.html',
	styleUrl: './public.component.scss',
	imports: [RouterLinkActive, RouterLink, RouterOutlet]
})
export class PublicComponent {
	us = inject(UserService);
}
