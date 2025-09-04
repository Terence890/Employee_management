import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private themeService = inject(ThemeService);

  isDarkTheme = this.themeService.isDarkTheme;
  user = this.authService.user;
  profileForm: FormGroup;
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  constructor() {
    const currentUser = this.user();
    this.profileForm = this.fb.group({
      name: [currentUser?.name || ''],
      email: [currentUser?.email || ''],
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.authService.updateUser(this.profileForm.value).subscribe({
        next: () => {
          this.successMessage.set('Profile updated successfully!');
          this.errorMessage.set(null);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(err.error?.message || 'An unexpected error occurred.');
          this.successMessage.set(null);
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('Selected file:', file);
    }
  }
}
