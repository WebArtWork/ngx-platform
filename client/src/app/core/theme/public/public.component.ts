import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html',
    styleUrl: './public.component.scss',
    imports: [RouterLinkActive, RouterLink, RouterOutlet]
})
export class PublicComponent {
	constructor(public us: UserService) {}
}
