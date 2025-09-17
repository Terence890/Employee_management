import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './signin/signin';
import { SignUpComponent } from './signup/signup';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: LandingPageComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
    ]),
  ],
};