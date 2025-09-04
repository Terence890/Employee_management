import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _theme = signal('dark');
  theme = this._theme.asReadonly();

  setTheme(theme: string) {
    this._theme.set(theme);
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
  }
}
