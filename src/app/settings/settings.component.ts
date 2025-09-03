import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private themeService = inject(ThemeService);
  theme = this.themeService.theme;

  settings = signal({
    emailNotifications: true,
    pushNotifications: false,
  });

  updateTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

  updateEmailNotifications(enabled: boolean) {
    this.settings.update(s => ({ ...s, emailNotifications: enabled }));
  }

  updatePushNotifications(enabled: boolean) {
    this.settings.update(s => ({ ...s, pushNotifications: enabled }));
  }
}
