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
  styles: [`
    :host {
      --primary-glow: #00f2ff;
      --secondary-glow: #a800ff;
      --text-color: #e0e0e0;
      --background-color: #0a0a1a;
      --sidebar-background: rgba(10, 10, 26, 0.9);
      --content-background: rgba(16, 16, 32, 0.9);
      --border-color: rgba(0, 242, 255, 0.2);
      --hover-background: rgba(0, 242, 255, 0.1);
      --sidebar-width: 260px;
    }

    .layout {
      display: flex;
      height: 100vh;
      background-color: var(--background-color);
      color: var(--text-color);
      font-family: 'Roboto', sans-serif;
    }

    app-sidebar {
      transition: transform 0.3s ease-in-out;
      z-index: 100;
    }

    .content {
      flex: 1;
      padding: 3rem;
      overflow-y: auto;
      background-color: var(--content-background);
    }
    
    .mobile-header {
      display: none; 
    }

    .backdrop {
      display: none;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      app-sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
      }

      app-sidebar.open {
        transform: translateX(0);
      }

      .content {
        padding: 1.5rem;
        padding-top: 6rem;
      }
      
      .mobile-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: var(--sidebar-background);
        z-index: 101;
        border-bottom: 1px solid var(--border-color);
      }
      
      .logo a {
        font-size: 1.8rem;
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        letter-spacing: 2px;
        text-transform: uppercase;
        background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .menu-toggle {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.8rem;
        cursor: pointer;
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
        display: none;
      }

      .backdrop.open {
        display: block;
      }
    }

    /* Custom scrollbar for webkit browsers */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--primary-glow);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--secondary-glow);
    }
  `]
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
