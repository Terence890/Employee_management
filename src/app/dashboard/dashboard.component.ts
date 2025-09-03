import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { EmployeesService } from '../employees/employees.service';
import { DepartmentsService } from '../departments/departments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <div class="dashboard-header">
      <h1>Welcome back, Admin!</h1>
      <p>Here's a snapshot of your organization's activities.</p>
    </div>
    <div class="dashboard-grid">
      <div class="card departments-overview">
        <div class="card-header">
          <i class="icon iconoir-building"></i>
          <h3>Departments</h3>
        </div>
        <div class="card-body">
          <p class="stat">{{ activeDepartments() }}</p>
          <p class="label">Active Departments</p>
        </div>
      </div>
      <div class="card employees-overview">
        <div class="card-header">
          <i class="icon iconoir-group"></i>
          <h3>Employees</h3>
        </div>
        <div class="card-body">
          <p class="stat">{{ totalEmployees() }}</p>
          <p class="label">Employees Onboard</p>
        </div>
      </div>
      <div class="card full-width recent-activity">
        <div class="card-header">
            <i class="icon iconoir-bell"></i>
            <h3>Recent Activity</h3>
        </div>
        <div class="card-body">
            <ul>
                @for (activity of recentActivity(); track activity.id) {
                    <li>
                        <i class="activity-icon {{ activity.icon }}"></i>
                        <span class="activity-description">{{ activity.description }}</span>
                        <span class="activity-time">{{ activity.time }}</span>
                    </li>
                }
            </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
        --primary-glow: #00f2ff;
        --secondary-glow: #a800ff;
        --card-background: rgba(16, 16, 32, 0.8);
        --border-color: rgba(0, 242, 255, 0.2);
        --hover-border-color: rgba(0, 242, 255, 0.8);
        --text-color: #e0e0e0;
        --stat-font-size: 3rem;
        --label-font-size: 1.2rem;
    }

    .dashboard-header {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }

    .dashboard-header h1 {
        font-size: 2.5rem;
        font-weight: bold;
        background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .dashboard-header p {
        font-size: 1.2rem;
        color: #aaa;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .card {
      background: var(--card-background);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        border-color: var(--hover-border-color);
    }
    
    .card-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: rgba(0,0,0,0.2);
        border-bottom: 1px solid var(--border-color);
    }

    .card-header .icon {
        font-size: 1.8rem;
        line-height: 1;
    }

    .card-header h3 {
        font-size: 1.3rem;
        margin: 0;
        font-weight: 600;
    }

    .card-body {
        padding: 2rem;
        text-align: center;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .stat {
        font-size: var(--stat-font-size);
        font-weight: bold;
        margin: 0;
        background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .label {
        font-size: var(--label-font-size);
        color: #aaa;
        margin-top: 0.5rem;
    }
    
    .full-width {
      grid-column: 1 / -1;
    }

    .recent-activity .card-body {
        text-align: left;
    }
    
    .recent-activity ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .recent-activity li {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        border-radius: 8px;
        background: rgba(0,0,0,0.2);
        transition: background 0.3s ease;
    }
    
    .recent-activity li:hover {
        background: rgba(0, 242, 255, 0.1);
    }
    
    .activity-icon {
        font-size: 1.5rem;
        line-height: 1;
    }

    .activity-description {
        color: var(--text-color);
    }

    .activity-time {
        color: #aaa;
        font-size: 0.9rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private employeesService = inject(EmployeesService);
  private departmentsService = inject(DepartmentsService);

  private employees = this.employeesService.getEmployees();
  private departments = this.departmentsService.getDepartments();

  totalEmployees = computed(() => this.employees().length);
  activeDepartments = computed(() => this.departments().length);

  recentActivity = computed(() => {
    const latestEmployees = this.employees()
      .slice(-4) // Get the last 4 employees
      .map(employee => ({
        id: employee.id,
        icon: 'iconoir-user-plus',
        description: `New employee added: ${employee.name}`,
        time: 'Just now' // Placeholder time
      }));
    return latestEmployees;
  });
}
