import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title text-gradient">Create Account</h1>
        <p class="auth-subtitle">Join WorkZen and streamline your workflow</p>

        @if (errorMessage()) {
          <div class="error-message">{{ errorMessage() }}</div>
        }
        @if (successMessage()) {
          <div class="success-message">{{ successMessage() }}</div>
        }

        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <i class="iconoir-user icon"></i>
            <input 
              type="text" 
              id="name" 
              formControlName="name" 
              placeholder=" " 
              autocomplete="name"
              [class.submitted]="submitted()">
            <label for="name">Full Name</label>
            @if (name.invalid && (name.touched || submitted())) {
              <div class="validation-error">
                @if (name.errors?.['required']) {
                  <small>Full name is required.</small>
                }
              </div>
            }
          </div>
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
              autocomplete="new-password"
              [class.submitted]="submitted()">
            <label for="password">Password</label>
            @if (password.invalid && (password.touched || submitted())) {
              <div class="validation-error">
                @if (password.errors?.['required']) {
                  <small>Password is required.</small>
                }
                @if (password.errors?.['minlength']) {
                  <small>Password must be at least 8 characters long.</small>
                }
              </div>
            }
          </div>
          <button type="submit" [disabled]="signupForm.invalid && submitted()" class="auth-button">Create Account</button>
        </form>
        <p class="auth-link">Already have an account? <a routerLink="/signin">Sign In</a></p>
      </div>
    </div>
  `,
  styleUrls: ['./auth.shared.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  submitted = signal(false);

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  get name() {
    return this.signupForm.controls.name;
  }

  get email() {
    return this.signupForm.controls.email;
  }

  get password() {
    return this.signupForm.controls.password;
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next: () => {
        this.successMessage.set('Registration successful! You can now sign in.');
        this.errorMessage.set(null);
        this.signupForm.reset();
        this.submitted.set(false);
        setTimeout(() => this.router.navigate(['/signin']), 2000);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.error?.message || 'An unexpected error occurred. Please try again.');
        this.successMessage.set(null);
      }
    });
  }
}
