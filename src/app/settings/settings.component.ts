import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  template: `
    <div class="settings-header">
      <h1>Settings</h1>
      <p>Manage your account and application preferences.</p>
    </div>
    <div class="settings-layout">
      <div class="settings-nav">
        @for (item of menuItems; track item.id) {
          <button 
            (click)="activeSection.set(item.id)" 
            [class.active]="activeSection() === item.id">
            <i class="icon {{ item.icon }}"></i>
            <span>{{ item.label }}</span>
          </button>
        }
      </div>
      <div class="settings-content">
        @switch (activeSection()) {
          @case ('profile') {
            <form [formGroup]="profileForm" class="settings-section">
              <h2><i class="icon iconoir-user"></i> Profile Information</h2>
              <div class="form-grid">
                <div class="form-field">
                  <label for="name">Full Name</label>
                  <input id="name" type="text" formControlName="name" placeholder="Enter your full name">
                </div>
                <div class="form-field">
                  <label for="title">Job Title</label>
                  <input id="title" type="text" formControlName="title" placeholder="Enter your job title">
                </div>
              </div>
              <div class="form-field">
                <label for="email">Email Address</label>
                <input id="email" type="email" formControlName="email" placeholder="Enter your email address">
              </div>
              <div class="form-actions">
                <button type="submit" class="save-button">Save Profile</button>
              </div>
            </form>
          }
          @case ('notifications') {
            <div class="settings-section">
              <h2><i class="icon iconoir-bell"></i> Notification Settings</h2>
              <div class="notification-option">
                <div class="option-text">
                  <h3>Email Notifications</h3>
                  <p>Receive summaries of activity and important updates.</p>
                </div>
                <div class="option-control">
                  <label class="switch">
                    <input type="checkbox" [checked]="notifications().email" (change)="toggleNotification('email')">
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
              <div class="notification-option">
                <div class="option-text">
                  <h3>Push Notifications</h3>
                  <p>Get real-time alerts on your devices.</p>
                </div>
                <div class="option-control">
                  <label class="switch">
                    <input type="checkbox" [checked]="notifications().push" (change)="toggleNotification('push')">
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          }
          @case ('appearance') {
            <div class="settings-section">
              <h2><i class="icon iconoir-color-palette"></i> Appearance</h2>
              <div class="form-field">
                <label>Theme</label>
                <div class="theme-options">
                    @for (theme of themes; track theme.id) {
                        <button 
                            class="theme-button" 
                            [class.active]="activeTheme() === theme.id" 
                            (click)="activeTheme.set(theme.id)">
                            <div class="swatch" [style.background]="theme.primaryColor"></div>
                            <span>{{ theme.name }}</span>
                        </button>
                    }
                </div>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
        --primary-glow: #00f2ff;
        --secondary-glow: #a800ff;
        --card-background: rgba(16, 16, 32, 0.7);
        --border-color: rgba(0, 242, 255, 0.2);
        --text-color: #e0e0e0;
        --input-background: rgba(0,0,0,0.3);
        --input-border: rgba(255,255,255,0.2);
    }

    .settings-header {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }

    .settings-header h1 {
        font-size: 2.5rem;
        font-weight: bold;
        background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .settings-header p {
        font-size: 1.2rem;
        color: #aaa;
    }

    .settings-layout {
        display: grid;
        grid-template-columns: 240px 1fr;
        gap: 2rem;
    }

    .settings-nav button {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 1rem;
        padding: 1rem;
        background: transparent;
        border: none;
        border-radius: 8px;
        color: var(--text-color);
        font-size: 1.1rem;
        text-align: left;
        cursor: pointer;
        transition: background 0.3s ease, color 0.3s ease;
        border-left: 3px solid transparent;
    }

    .settings-nav button:hover {
        background: rgba(0, 242, 255, 0.1);
    }

    .settings-nav button.active {
        background: rgba(0, 242, 255, 0.15);
        color: #fff;
        font-weight: bold;
        border-left: 3px solid var(--primary-glow);
    }
    
    .settings-nav button .icon {
        font-size: 1.5rem;
    }

    .settings-content {
        background: var(--card-background);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
        padding: 2.5rem;
    }
    
    .settings-section h2 {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--primary-glow);
        margin: 0 0 2rem 0;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .settings-section h2 .icon {
      font-size: 2.2rem;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
    }

    .form-field {
        margin-bottom: 1.5rem;
    }
    
    .form-field label {
        display: block;
        margin-bottom: 0.5rem;
        color: #aaa;
        font-weight: 500;
    }

    .form-field input {
        width: 100%;
        padding: 0.8rem 1rem;
        background: var(--input-background);
        border: 1px solid var(--input-border);
        border-radius: 8px;
        color: var(--text-color);
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .form-field input:focus {
        outline: none;
        border-color: var(--primary-glow);
        box-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
    }
    
    .form-actions {
      margin-top: 1.5rem;
      display: flex;
      justify-content: flex-end;
    }
    
    .save-button {
        background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
        color: #fff;
        padding: 0.8rem 2rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .save-button:hover {
        box-shadow: 0 0 20px rgba(0, 242, 255, 0.5);
        transform: translateY(-2px);
    }
    
    .notification-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--border-color);
    }

    .notification-option:last-child { border: none; }
    
    .option-text h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1.2rem;
      color: #fff;
      font-weight: 500;
    }
    
    .option-text p {
      margin: 0;
      color: #aaa;
    }
    
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--input-background);
      transition: .4s;
      border-radius: 34px;
      border: 1px solid var(--input-border);
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--primary-glow);
      box-shadow: 0 0 10px var(--primary-glow);
    }
    
    input:checked + .slider:before {
      transform: translateX(26px);
    }

    .theme-options {
      display: flex;
      gap: 1.5rem;
    }
    
    .theme-button {
      background-color: var(--input-background);
      border: 2px solid var(--input-border);
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.3s ease;
      min-width: 120px;
    }
    
    .theme-button:hover, .theme-button.active {
      border-color: var(--primary-glow);
      transform: translateY(-3px);
    }
    
    .theme-button.active {
      box-shadow: 0 0 15px rgba(0, 242, 255, 0.4);
    }

    .swatch {
      width: 50px;
      height: 30px;
      border-radius: 5px;
    }
    
    .theme-button span {
      color: var(--text-color);
      font-weight: 500;
    }
  `]
})
export class SettingsComponent {
  private fb = inject(FormBuilder);

  activeSection = signal('profile');
  menuItems = [
    { id: 'profile', label: 'Profile', icon: 'iconoir-user' },
    { id: 'notifications', label: 'Notifications', icon: 'iconoir-bell' },
    { id: 'appearance', label: 'Appearance', icon: 'iconoir-color-palette' },
  ];

  profileForm = this.fb.group({
    name: ['Jane Doe', Validators.required],
    title: ['Senior Software Engineer', Validators.required],
    email: ['jane.doe@workzen.com', [Validators.required, Validators.email]],
  });

  notifications = signal({ email: true, push: false });
  toggleNotification(type: 'email' | 'push') {
    this.notifications.update(current => ({ ...current, [type]: !current[type] }));
  }

  activeTheme = signal('dark_blue');
  themes = [
      { id: 'dark_blue', name: 'Dark Blue', primaryColor: '#00f2ff' },
      { id: 'purple_haze', name: 'Purple Haze', primaryColor: '#a800ff' },
      { id: 'green_energy', name: 'Green Energy', primaryColor: '#00ff87' }
  ];
}
