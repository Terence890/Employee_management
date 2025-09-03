import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { EmployeesService } from './employees.service';
import { EmployeeFormComponent } from './employee-form.component';

@Component({
  selector: 'app-employees',
  imports: [EmployeeFormComponent],
  template: `
    <div class="employees-page">
      <header class="page-header">
        <h1>Employees</h1>
        <div class="actions">
          <input type="search" placeholder="Search employees..." [value]="searchTerm()" (input)="searchTerm.set($event.target.value)" class="search-input">
          <button (click)="openForm()" class="add-button">
            <i class="iconoir-plus"></i>
            <span>Add Employee</span>
          </button>
        </div>
      </header>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Hire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (employee of filteredEmployees(); track employee.id) {
              <tr>
                <td>{{ employee.name }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.department }}</td>
                <td>{{ employee.position }}</td>
                <td>{{ employee.hireDate }}</td>
                <td>
                  <button (click)="editEmployee(employee)" class="action-button edit-button">
                    <i class="iconoir-edit-pencil"></i>
                  </button>
                  <button (click)="deleteEmployee(employee.id)" class="action-button delete-button">
                    <i class="iconoir-trash"></i>
                  </button>
                </td>
              </tr>
            }
            @if (filteredEmployees().length === 0) {
              <tr>
                <td colspan="6" class="no-results">No employees found.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (isFormOpen()) {
        <div class="modal-backdrop">
          <app-employee-form 
            [employee]="selectedEmployee()" 
            (close)="closeForm()" 
            (save)="saveEmployee($event)"
          ></app-employee-form>
        </div>
      }
    </div>
  `,
  styles: [`
    .employees-page {
      padding: 2rem;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    h1 {
      font-size: 2.5rem;
      font-weight: bold;
    }
    .actions {
      display: flex;
      gap: 1rem;
    }
    .search-input {
      padding: 0.75rem 1rem;
      border: 1px solid #333;
      border-radius: 8px;
      background: #1c1c1c;
      color: #fff;
      font-size: 1rem;
    }
    .add-button {
      background: #007bff;
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
    }
    .add-button .iconoir-plus {
      font-size: 1.2rem;
    }
    .table-container {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #333;
    }
    th {
      background: #1c1c1c;
      font-weight: bold;
    }
    .action-button {
      background: none;
      border: none;
      color: #aaa;
      cursor: pointer;
      font-size: 1.2rem;
      margin-right: 0.5rem;
    }
    .edit-button {
      color: #007bff;
    }
    .delete-button {
      color: #d9534f;
    }
    .no-results {
      text-align: center;
      padding: 2rem;
      font-style: italic;
      color: #777;
    }
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class EmployeesComponent {
  private employeesService = inject(EmployeesService);
  
  employees = this.employeesService.getEmployees();
  searchTerm = signal('');
  isFormOpen = signal(false);
  selectedEmployee = signal<any>(null);

  filteredEmployees = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.employees().filter(employee => 
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.department.toLowerCase().includes(term)
    );
  });

  openForm() {
    this.isFormOpen.set(true);
    this.selectedEmployee.set(null);
  }

  closeForm() {
    this.isFormOpen.set(false);
  }

  editEmployee(employee: any) {
    this.selectedEmployee.set(employee);
    this.isFormOpen.set(true);
  }

  saveEmployee(employee: any) {
    if (employee.id) {
      this.employeesService.updateEmployee(employee);
    } else {
      this.employeesService.addEmployee(employee);
    }
    this.closeForm();
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeesService.deleteEmployee(id);
    }
  }
}
