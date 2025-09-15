import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DepartmentsService, Department } from './departments.service';
import { DepartmentFormComponent } from './department-form.component';

@Component({
  selector: 'app-departments',
  imports: [DepartmentFormComponent],
  template: `
   <div class="departments-page">
    <div class="departments-header">
      <h1 class="text-gradient">Departments</h1>
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
        (save)="saveDepartment($event)" />
    }
   </div>
  `,
  styleUrls: ['./departments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentsComponent {
  private departmentsService = inject(DepartmentsService);
  departments = this.departmentsService.getDepartments();

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

  openForm(department: Department | null = null) {
    this.selectedDepartment.set(department);
    this.isFormOpen.set(true);
  }
  
  closeForm() {
    this.isFormOpen.set(false);
    this.selectedDepartment.set(null);
  }
  
  saveDepartment(department: Omit<Department, 'id'> | Department) {
    if ('id' in department) {
      this.departmentsService.updateDepartment(department as Department);
    } else {
      this.departmentsService.addDepartment(department);
    }
    this.closeForm();
  }
  
  deleteDepartment(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentsService.deleteDepartment(id);
    }
  }
}
