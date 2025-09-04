import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { EmployeesService } from '../employees/employees.service';
import { DepartmentsService } from '../departments/departments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
