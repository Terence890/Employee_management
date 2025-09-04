import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { EmployeesService, Employee } from './employees.service';
import { EmployeeFormComponent } from './employee-form.component';

@Component({
  selector: 'app-employees',
  imports: [EmployeeFormComponent],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent {
  private employeesService = inject(EmployeesService);
  
  employees = this.employeesService.getEmployees();
  searchTerm = signal('');
  isFormOpen = signal(false);
  selectedEmployee = signal<Employee | null>(null);
  viewMode = signal<'card' | 'list'>('card');

  filteredEmployees = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.employees().filter(employee => 
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.department.toLowerCase().includes(term)
    );
  });

  setViewMode(mode: 'card' | 'list') {
    this.viewMode.set(mode);
  }

  openForm(employee: Employee | null = null) {
    this.selectedEmployee.set(employee);
    this.isFormOpen.set(true);
  }

  closeForm() {
    this.isFormOpen.set(false);
    this.selectedEmployee.set(null);
  }

  editEmployee(employee: Employee) {
    this.openForm(employee);
  }

  saveEmployee(employee: Omit<Employee, 'id'> | Employee) {
    if ('id' in employee && employee.id) {
      this.employeesService.updateEmployee(employee as Employee);
    } else {
      this.employeesService.addEmployee(employee as Omit<Employee, 'id'>);
    }
    this.closeForm();
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeesService.deleteEmployee(id);
    }
  }
}
