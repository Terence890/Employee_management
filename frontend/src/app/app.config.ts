import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: LandingPageComponent },
    ]),
  ],
};