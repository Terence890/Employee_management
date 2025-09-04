import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeesService } from '../employees/employees.service';
import { DepartmentsService } from '../departments/departments.service';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../attendance.service'; // Import AttendanceService
import { Attendance } from '../attendance';

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
  private attendanceService = inject(AttendanceService); // Inject AttendanceService

  private employees = this.employeesService.getEmployees();
  private departments = this.departmentsService.getDepartments();
  private attendance = toSignal(this.attendanceService.getAttendance(), { initialValue: [] }); // Get attendance data

  totalEmployees = computed(() => this.employees().length);
  activeDepartments = computed(() => this.departments().length);

  // Calculate number of present employees
  presentEmployees = computed(() => this.attendance().filter((a: Attendance) => a.present).length);

  // Calculate number of absent employees
  absentEmployees = computed(() => this.totalEmployees() - this.presentEmployees());

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
