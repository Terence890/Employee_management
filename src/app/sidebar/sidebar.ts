import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar">
      <div class="logo-container">
        <img src="assets/logo.svg" alt="WorkZen Logo" class="logo">
        <h1>WorkZen</h1>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/dashboard" routerLinkActive="active"><i class="iconoir-dashboard-dots"></i><span>Dashboard</span></a></li>
        <li><a routerLink="/departments" routerLinkActive="active"><i class="iconoir-building"></i><span>Departments</span></a></li>
        <li><a routerLink="/employees" routerLinkActive="active"><i class="iconoir-community"></i><span>Employees</span></a></li>
        <li><a routerLink="/profile" routerLinkActive="active"><i class="iconoir-user"></i><span>Profile</span></a></li>
        <li><a routerLink="/settings" routerLinkActive="active"><i class="iconoir-settings"></i><span>Settings</span></a></li>
      </ul>
      <div class="spacer"></div>
      <button (click)="logout()" class="logout-button"><i class="iconoir-log-out"></i><span>Logout</span></button>
    </nav>
  `,
  styleUrls: ['./sidebar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
