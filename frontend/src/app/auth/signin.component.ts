import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title text-gradient">Sign In</h1>
        <p class="auth-subtitle">Welcome back to WorkZen</p>

        @if (errorMessage()) {
          <div class="error-message">{{ errorMessage() }}</div>
        }

        <form [formGroup]="signinForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <i class="iconoir-mail icon"></i>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              placeholder=" " 
              autocomplete="email"
              [class.submitted]="submitted()">
            <label for="email">Email</label>
            @if (email.invalid && (email.touched || submitted())) {
              <div class="validation-error">
                @if (email.errors?.['required']) {
                  <small>Email is required.</small>
                }
                @if (email.errors?.['email']) {
                  <small>Please enter a valid email address.</small>
                }
              </div>
            }
          </div>
          <div class="form-group">
            <i class="iconoir-lock icon"></i>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              placeholder=" " 
              autocomplete="current-password"
              [class.submitted]="submitted()">
            <label for="password">Password</label>
            @if (password.invalid && (password.touched || submitted())) {
              <div class="validation-error">
                @if (password.errors?.['required']) {
                  <small>Password is required.</small>
                }
              </div>
            }
          </div>
          <button type="submit" [disabled]="signinForm.invalid && submitted()" class="auth-button">Sign In</button>
        </form>
        <p class="auth-link">Don't have an account? <a routerLink="/signup">Sign Up</a></p>
      </div>
    </div>
  `,
  styleUrls: ['./auth.shared.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);
  submitted = signal(false);

  signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  get email() {
    return this.signinForm.controls.email;
  }

  get password() {
    return this.signinForm.controls.password;
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.signinForm.invalid) {
      return;
    }
    
    this.authService.login(this.signinForm.value).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage.set('Invalid email or password. Please try again.');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.error?.message || 'An unexpected error occurred. Please try again.');
      }
    });
  }
}
