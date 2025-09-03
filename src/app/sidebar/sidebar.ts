import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  template: `
    <nav class="sidebar">
      <div class="logo-container">
        <img src="assets/logo.svg" alt="WorkZen Logo" class="logo">
        <h1>WorkZen</h1>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
        <li><a routerLink="/departments" routerLinkActive="active">Departments</a></li>
        <li><a routerLink="/employees" routerLinkActive="active">Employees</a></li>
        <li><a routerLink="/profile" routerLinkActive="active">Profile</a></li>
        <li><a routerLink="/settings" routerLinkActive="active">Settings</a></li>
      </ul>
      <button (click)="logout()" class="logout-button">Logout</button>
    </nav>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: #1c1c1c;
      height: 100vh;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
    }
    .logo-container {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
    }
    .logo {
      width: 40px;
      height: 40px;
      margin-right: 0.5rem;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
    }
    .nav-links {
      list-style: none;
      padding: 0;
      margin: 0;
      flex-grow: 1;
    }
    .nav-links li a {
      display: block;
      color: #aaa;
      padding: 1rem;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .nav-links li a:hover, .nav-links li a.active {
      background: #333;
      color: #fff;
    }
    .logout-button {
      background: #d9534f;
      color: #fff;
      border: none;
      padding: 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .logout-button:hover {
      background: #c9302c;
    }
  `]
})
export class Sidebar {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
