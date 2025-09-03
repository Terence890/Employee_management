import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { EmployeesService, Employee } from './employees.service';
import { CurrencyPipe } from '@angular/common';
import { EmployeeFormComponent } from './employee-form.component';

@Component({
  selector: 'app-employees',
  imports: [CurrencyPipe, EmployeeFormComponent],
  template: `
    <div class="employees-header">
      <h1>Employees</h1>
      <div class="actions">
        <input type="text" placeholder="Search employees..." [value]="searchTerm()" (input)="searchTerm.set($event.target.value)" class="search-input">
        <button class="add-employee-button" (click)="onAdd()"><i class="icon iconoir-plus"></i> Add Employee</button>
      </div>
    </div>

    <div class="employees-table-container">
      <table class="employees-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (emp of filteredEmployees(); track emp.id) {
            <tr>
              <td>{{ emp.name }}</td>
              <td>{{ emp.email }}</td>
              <td>{{ emp.department }}</td>
              <td>{{ emp.position }}</td>
              <td>{{ emp.salary | currency }}</td>
              <td>
                <div class="employee-actions">
                  <button (click)="onEdit(emp)"><i class="icon iconoir-edit-pencil"></i></button>
                  <button (click)="onDelete(emp.id)"><i class="icon iconoir-trash"></i></button>
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    
    @if (isFormVisible()) {
      <app-employee-form 
        [employee]="selectedEmployee()" 
        (close)="onCloseForm()" 
        (saveEmployee)="onSave($event)" />
    }
  `,
  styles: [`
    :host {
      --primary-glow: #00f2ff;
      --secondary-glow: #a800ff;
      --table-background: rgba(16, 16, 32, 0.8);
      --border-color: rgba(0, 242, 255, 0.2);
      --text-color: #e0e0e0;
    }

    .employees-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
      gap: 1rem;
    }

    .employees-header h1 {
      font-size: 2.5rem;
      font-weight: bold;
      background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .search-input {
      background: rgba(255,255,255,0.1);
      border: 1px solid var(--border-color);
      color: var(--text-color);
      padding: 0.8rem 1rem;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      width: 100%;
      max-width: 300px;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-glow);
      box-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
    }

    .add-employee-button {
      background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
      color: #fff;
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      justify-content: center;
    }

    .add-employee-button:hover {
      box-shadow: 0 0 20px rgba(0, 242, 255, 0.5);
      transform: translateY(-2px);
    }
    
    .add-employee-button .icon {
      font-size: 1.3rem;
    }

    .employees-table-container {
      overflow-x: auto;
    }

    .employees-table {
      width: 100%;
      border-collapse: collapse;
      background: var(--table-background);
      border-radius: 12px;
      overflow: hidden;
    }

    .employees-table th, .employees-table td {
      padding: 1.2rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    .employees-table th {
      background: rgba(0,0,0,0.3);
      font-weight: 600;
      color: #fff;
    }

    .employees-table tbody tr:last-child td {
      border-bottom: none;
    }

    .employees-table tbody tr:hover {
      background: rgba(0, 242, 255, 0.05);
    }
    
    .employee-actions button {
      background: none;
      border: none;
      color: #aaa;
      cursor: pointer;
      transition: color 0.3s ease;
      margin-left: 0.5rem;
      padding: 0.25rem;
    }
    
    .employee-actions button .icon {
      font-size: 1.4rem;
      line-height: 1;
    }
    
    .employee-actions button:hover {
      color: var(--primary-glow);
    }
    
    @media (min-width: 768px) {
      .actions {
        flex-wrap: nowrap;
      }
      
      .search-input {
        width: auto;
      }
      
      .add-employee-button {
        width: auto;
      }
    }
  `]
})
export class EmployeesComponent {
  private employeesService = inject(EmployeesService);
  employees = signal<Employee[]>([]);

  searchTerm = signal('');
  isFormVisible = signal(false);
  selectedEmployee = signal<Employee | null>(null);

  filteredEmployees = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.employees().filter(emp => 
      emp.name.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.department.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term)
    );
  });

  constructor() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeesService.getEmployees().subscribe(employees => this.employees.set(employees));
  }

  onAdd() {
    this.selectedEmployee.set(null);
    this.isFormVisible.set(true);
  }

  onEdit(employee: Employee) {
    this.selectedEmployee.set(employee);
    this.isFormVisible.set(true);
  }

  onDelete(id: number) {
    this.employeesService.deleteEmployee(id).subscribe(() => this.loadEmployees());
  }

  onCloseForm() {
    this.isFormVisible.set(false);
  }

  onSave(employee: Employee) {
    this.employeesService.saveEmployee(employee).subscribe(() => this.loadEmployees());
    this.isFormVisible.set(false);
  }
}
