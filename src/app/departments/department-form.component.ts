import { ChangeDetectionStrategy, Component, output, signal, input, OnInit } from '@angular/core';
import { Department } from './departments.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-form',
  imports: [FormsModule],
  template: `
    <div class="form-overlay" (click)="close.emit()">
      <div class="form-container" (click)="$event.stopPropagation()">
        <h2>{{ department() ? 'Edit' : 'Add' }} Department</h2>
        <form (ngSubmit)="save()">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" [(ngModel)]="name" required>
          </div>
          <div class="form-group">
            <label for="head">Head</label>
            <input type="text" id="head" name="head" [(ngModel)]="head" required>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" [(ngModel)]="description" required></textarea>
          </div>
          <div class="form-actions">
            <button type="button" (click)="close.emit()">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }

    .form-container {
      background: #1a1a2e;
      padding: 2rem;
      border-radius: 12px;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 0 20px rgba(0, 242, 255, 0.3);
      border: 1px solid rgba(0, 242, 255, 0.2);
    }

    h2 {
      margin-top: 0;
      font-size: 1.8rem;
      color: #fff;
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #e0e0e0;
      font-size: 1rem;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.8rem 1rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(0, 242, 255, 0.2);
      color: #fff;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: #00f2ff;
      box-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    button[type="submit"] {
      background: linear-gradient(90deg, #00f2ff, #a800ff);
      color: #fff;
    }

    button[type="submit"]:hover {
      box-shadow: 0 0 20px rgba(0, 242, 255, 0.5);
    }

    button[type="button"] {
      background: transparent;
      border: 1px solid rgba(0, 242, 255, 0.2);
      color: #e0e0e0;
    }

    button[type="button"]:hover {
      background: rgba(0, 242, 255, 0.1);
      color: #fff;
    }
    
    @media (max-width: 500px) {
        .form-actions {
            flex-direction: column;
        }
        
        button {
            width: 100%;
        }
    }
  `]
})
export class DepartmentFormComponent implements OnInit {
  department = input<Department | null>(null);
  close = output<void>();
  saveDepartment = output<Department>();

  name = '';
  head = '';
  description = '';

  ngOnInit() {
    const currentDepartment = this.department();
    if (currentDepartment) {
      this.name = currentDepartment.name;
      this.head = currentDepartment.head;
      this.description = currentDepartment.description;
    }
  }

  save() {
    const currentDepartment = this.department();
    const departmentToSave: Omit<Department, 'memberCount'> & { memberCount?: number } = {
      id: currentDepartment ? currentDepartment.id : 0, // Use 0 for new departments, service will assign real ID
      name: this.name,
      head: this.head,
      description: this.description,
    };
    
    if (currentDepartment) {
        departmentToSave.memberCount = currentDepartment.memberCount;
    }

    this.saveDepartment.emit(departmentToSave as Department);
    this.close.emit();
  }
}
