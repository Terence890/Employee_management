import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NgOptimizedImage],
  template: `
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-backdrop"></div>
        <div class="profile-header">
          <img [ngSrc]="user().avatar" [alt]="user().name" width="150" height="150" class="avatar">
          <h2 class="name">{{ user().name }}</h2>
          <p class="title">{{ user().title }}</p>
        </div>
        <div class="profile-body">
            <div class="info-section">
                <h3>About Me</h3>
                <p>{{ user().about }}</p>
            </div>
            <div class="info-section">
                <h3>Contact Information</h3>
                <ul>
                    <li><i class="icon iconoir-mail"></i> <strong>Email:</strong> {{ user().email }}</li>
                    <li><i class="icon iconoir-phone"></i> <strong>Phone:</strong> {{ user().phone }}</li>
                </ul>
            </div>
        </div>
        <div class="profile-footer">
          <button class="action-button">Edit Profile</button>
          <button class="action-button secondary">Change Password</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
        --primary-glow: #00f2ff;
        --secondary-glow: #a800ff;
        --card-background: rgba(16, 16, 32, 0.85);
        --border-color: rgba(0, 242, 255, 0.2);
        --text-color: #e0e0e0;
        --backdrop-height: 200px;
    }

    .profile-container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 50px;
    }

    .profile-card {
        background: var(--card-background);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
        max-width: 700px;
        width: 100%;
        text-align: center;
        overflow: hidden;
        position: relative;
    }
    
    .profile-backdrop {
        height: var(--backdrop-height);
        background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
        opacity: 0.6;
    }

    .profile-header {
        margin-top: -100px; /* Half of avatar height + some padding */
        position: relative;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 4px solid #fff;
        box-shadow: 0 0 25px var(--primary-glow);
        margin-bottom: 1rem;
    }
    
    .name {
        font-size: 2.2rem;
        font-weight: bold;
        margin: 0;
        color: #fff;
    }
    
    .title {
        font-size: 1.2rem;
        color: #aaa;
        margin: 0.25rem 0 0 0;
    }

    .profile-body {
        padding: 2rem;
        text-align: left;
    }
    
    .info-section {
        margin-bottom: 2rem;
    }
    
    .info-section:last-child {
        margin-bottom: 0;
    }
    
    .info-section h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--primary-glow);
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-color);
        margin-bottom: 1rem;
    }
    
    .info-section p,
    .info-section ul {
        color: var(--text-color);
        line-height: 1.7;
    }
    
    .info-section ul {
        list-style: none;
        padding: 0;
    }
    
    .info-section li {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .info-section .icon {
        font-size: 1.2rem;
        color: var(--primary-glow);
    }

    .profile-footer {
        padding: 1.5rem;
        border-top: 1px solid var(--border-color);
        background: rgba(0,0,0,0.2);
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }
    
    .action-button {
        background: transparent;
        border: 1px solid var(--primary-glow);
        color: var(--primary-glow);
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .action-button:hover {
        background: var(--primary-glow);
        color: #000;
        box-shadow: 0 0 15px var(--primary-glow);
    }
    
    .action-button.secondary {
        border-color: #aaa;
        color: #aaa;
    }
    
    .action-button.secondary:hover {
        background: #aaa;
        color: #000;
        box-shadow: none;
    }
  `]
})
export class ProfileComponent {
  user = signal({
    name: 'Jane Doe',
    title: 'Senior Software Engineer',
    email: 'jane.doe@workzen.com',
    phone: '123-456-7890',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    about: 'A passionate software engineer with a love for creating beautiful and functional applications. I thrive in collaborative environments and am always eager to learn new technologies and solve challenging problems.',
  });
}
