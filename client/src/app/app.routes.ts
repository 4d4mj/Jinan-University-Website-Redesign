import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { TranscriptComponent } from './transcript/transcript.component';
import { canActivate } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [canActivate] },
  { path: 'registration', component: RegistrationComponent, canActivate: [canActivate] },
  { path: 'transcript', component: TranscriptComponent, canActivate: [canActivate] },
];
