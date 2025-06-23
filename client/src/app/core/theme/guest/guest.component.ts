import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss'],
    imports: [RouterOutlet]
})
export class GuestComponent {}
