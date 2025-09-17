
import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signin', component: Signin },
  { path: 'signup', component: Signup },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];
