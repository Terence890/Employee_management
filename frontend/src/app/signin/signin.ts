import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, FormsModule],
  template: `
    <div class="signin-container">
      <div class="signin-card">
        <h2>Sign In</h2>
        <p>Welcome back to WorkZen</p>
        <form class="signin-form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" [(ngModel)]="credentials.email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" [(ngModel)]="credentials.password" required>
          </div>
          <button type="submit" class="signin-button">Sign In</button>
        </form>
        <div class="or-divider">
          <span>OR</span>
        </div>
        <button class="google-signin-button">
          Sign in with Google
        </button>
        <p class="signup-link">
          Don't have an account? <a routerLink="/signup">Sign up</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      --primary-glow: #00f2ff;
      --secondary-glow: #a800ff;
      --card-background: rgba(16, 16, 32, 0.85);
      --border-color: rgba(0, 242, 255, 0.2);
      --text-color: #e0e0e0;
    }

    .signin-container {
      width: 100%;
      max-width: 450px;
    }

    .signin-card {
      background: var(--card-background);
      padding: 3rem;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      backdrop-filter: blur(10px);
      text-align: center;
    }

    h2 {
      font-size: 2.5rem;
      font-weight: bold;
      background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }

    .signin-card > p {
      color: #aaa;
      margin-bottom: 2rem;
    }

    .signin-form .form-group {
      text-align: left;
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-color);
      font-weight: 600;
    }

    .form-group input {
      width: 100%;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--border-color);
      color: var(--text-color);
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-group input:focus {
      outline: none;
      border-color: var(--primary-glow);
      box-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
    }

    .signin-button {
      width: 100%;
      background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
      color: #fff;
      padding: 1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
      transition: all 0.3s ease;
      margin-bottom: 1.5rem;
    }

    .signin-button:hover {
      box-shadow: 0 0 20px rgba(0, 242, 255, 0.5);
    }

    .or-divider {
      display: flex;
      align-items: center;
      text-align: center;
      color: #aaa;
      margin-bottom: 1.5rem;
    }

    .or-divider span {
      padding: 0 1rem;
    }

    .or-divider::before, .or-divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid var(--border-color);
    }

    .google-signin-button {
      width: 100%;
      background: #fff;
      color: #333;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: bold;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .google-signin-button:hover {
      background: #f2f2f2;
    }

    .google-signin-button img {
      width: 24px;
      height: 24px;
    }

    .signup-link {
      color: #aaa;
    }

    .signup-link a {
      color: var(--primary-glow);
      text-decoration: none;
      font-weight: bold;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Signin {
  private authService = inject(AuthService);

  credentials = {
    email: '',
    password: ''
  };

  onSubmit() {
    this.authService.login(this.credentials).subscribe();
  }
}
