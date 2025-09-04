import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, Sidebar],
  template: `
    <div class="layout">
       <div class="mobile-header">
        <div class="logo">
          <a href="/">WorkZen</a>
        </div>
        <button class="menu-toggle" (click)="toggleSidebar()">
          <i class="icon iconoir-menu"></i>
        </button>
      </div>
      <app-sidebar [class.open]="isSidebarOpen()"></app-sidebar>
       <div class="backdrop" [class.open]="isSidebarOpen()" (click)="closeSidebar()"></div>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
  
  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
