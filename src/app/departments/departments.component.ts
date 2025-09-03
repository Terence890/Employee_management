import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DepartmentsService, Department } from './departments.service';
import { DepartmentFormComponent } from './department-form.component';

@Component({
  selector: 'app-departments',
  imports: [DepartmentFormComponent],
  template: `
    <div class="departments-header">
      <h1>Departments</h1>
      <div class="actions">
        <input type="text" placeholder="Search departments..." [value]="searchTerm()" (input)="searchTerm.set($event.target.value)" class="search-input">
        <button class="add-department-button" (click)="openForm()"><i class="icon iconoir-plus"></i> Add Department</button>
      </div>
    </div>

    <div class="departments-grid">
      @for (dept of filteredDepartments(); track dept.id) {
        <div class="department-card">
          <div class="card-header">
            <h3>{{ dept.name }}</h3>
            <div class="department-actions">
                <button (click)="openForm(dept)"><i class="icon iconoir-edit-pencil"></i></button>
                <button (click)="deleteDepartment(dept.id)"><i class="icon iconoir-trash"></i></button>
            </div>
          </div>
          <div class="card-body">
            <p class="description">{{ dept.description }}</p>
          </div>
          <div class="card-footer">
              <div class="footer-item">
                  <span class="footer-label">Head</span>
                  <span class="footer-value">{{ dept.head }}</span>
              </div>
              <div class="footer-item">
                  <span class="footer-label">Members</span>
                  <span class="footer-value">{{ dept.memberCount }}</span>
              </div>
          </div>
        </div>
      }
    </div>
    
    @if (isFormOpen()) {
      <app-department-form 
        [department]="selectedDepartment()" 
        (close)="closeForm()" 
        (saveDepartment)="saveDepartment($event)" />
    }
  `,
  styles: [`
    :host {
      --primary-glow: #00f2ff;
      --secondary-glow: #a800ff;
      --card-background: rgba(16, 16, 32, 0.8);
      --border-color: rgba(0, 242, 255, 0.2);
      --hover-border-color: rgba(0, 242, 255, 0.8);
      --text-color: #e0e0e0;
    }

    .departments-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
      gap: 1rem;
    }

    .departments-header h1 {
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

    .add-department-button {
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

    .add-department-button:hover {
      box-shadow: 0 0 20px rgba(0, 242, 255, 0.5);
      transform: translateY(-2px);
    }
    
    .add-department-button .icon {
      font-size: 1.3rem;
    }

    .departments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .department-card {
        background: var(--card-background);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .department-card:hover {
        transform: translateY(-5px);
        border-color: var(--hover-border-color);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: rgba(0,0,0,0.2);
    }
    
    .card-header h3 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
    }
    
    .department-actions button {
        background: none;
        border: none;
        color: #aaa;
        cursor: pointer;
        transition: color 0.3s ease;
        margin-left: 0.5rem;
        padding: 0.25rem;
    }
    
    .department-actions button .icon {
        font-size: 1.4rem;
        line-height: 1;
    }
    
    .department-actions button:hover {
        color: var(--primary-glow);
    }

    .card-body {
        padding: 1.5rem;
        flex-grow: 1;
    }
    
    .description {
        color: #aaa;
        line-height: 1.6;
    }

    .card-footer {
        padding: 1.5rem;
        border-top: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        background: rgba(0,0,0,0.2);
    }
    
    .footer-item {
        text-align: center;
    }
    
    .footer-label {
        display: block;
        color: #aaa;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
    }
    
    .footer-value {
        display: block;
        color: var(--text-color);
        font-size: 1.1rem;
        font-weight: bold;
    }
    
    @media (min-width: 768px) {
      .actions {
        flex-wrap: nowrap;
      }
      
      .search-input {
        width: auto;
      }
      
      .add-department-button {
        width: auto;
      }
    }
  `]
})
export class DepartmentsComponent {
  private departmentsService = inject(DepartmentsService);
  departments = signal<Department[]>([]);

  searchTerm = signal('');
  isFormOpen = signal(false);
  selectedDepartment = signal<Department | null>(null);

  filteredDepartments = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.departments().filter(dept => 
        dept.name.toLowerCase().includes(term) || 
        dept.head.toLowerCase().includes(term)
    );
  });

  constructor() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentsService.getDepartments().subscribe(departments => this.departments.set(departments));
  }
  
  openForm(department: Department | null = null) {
    this.selectedDepartment.set(department);
    this.isFormOpen.set(true);
  }
  
  closeForm() {
    this.isFormOpen.set(false);
    this.selectedDepartment.set(null);
  }
  
  saveDepartment(department: Department) {
    this.departmentsService.saveDepartment(department).subscribe(() => this.loadDepartments());
    this.closeForm();
  }
  
  deleteDepartment(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentsService.deleteDepartment(id).subscribe(() => this.loadDepartments());
    }
  }
}
