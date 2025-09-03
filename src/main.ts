import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

// Clear local storage on application startup to prevent issues with stale or invalid data.
localStorage.clear();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
