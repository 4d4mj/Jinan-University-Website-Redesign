import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProfileComponent } from "../profile/profile.component";

@Component({
    selector: 'app-registration',
    standalone: true,
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css',
    imports: [NavbarComponent, ProfileComponent]
})
export class RegistrationComponent {

}
