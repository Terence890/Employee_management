import { Injectable, signal, effect, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = signal(true);

  isDarkTheme = computed(() => this.darkTheme());

  constructor() {
    effect(() => {
      if (this.darkTheme()) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
    });
  }

  toggleTheme() {
    this.darkTheme.set(!this.darkTheme());
  }
}
