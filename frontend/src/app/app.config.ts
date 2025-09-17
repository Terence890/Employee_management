import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: LandingPageComponent },
      { path: 'signin', component: Signin },
      { path: 'signup', component: Signup },
    ]),
  ],
};