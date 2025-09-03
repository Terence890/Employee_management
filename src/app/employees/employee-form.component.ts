import { ChangeDetectionStrategy, Component, output, input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from './employees.service';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="employeeForm" (ngSubmit)="save.emit(employeeForm.value)" class="employee-form">
      <h2>{{ employee() ? 'Edit' : 'Add' }} Employee</h2>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" formControlName="name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email">
      </div>
      <div class="form-group">
        <label for="department">Department</label>
        <input type="text" id="department" formControlName="department">
      </div>
      <div class="form-group">
        <label for="position">Position</label>
        <input type="text" id="position" formControlName="position">
      </div>
      <div class="form-actions">
        <button type="button" (click)="close.emit()" class="cancel-button">Cancel</button>
        <button type="submit" [disabled]="employeeForm.invalid" class="save-button">Save</button>
      </div>
    </form>
  `,
  styles: [`
    .employee-form {
      background: #1c1c1c;
      padding: 2rem;
      border-radius: 8px;
      width: 400px;
    }
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #aaa;
    }
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #333;
      border-radius: 8px;
      background: #222;
      color: #fff;
      font-size: 1rem;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }
    .cancel-button {
      background: #333;
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
    }
    .save-button {
      background: #007bff;
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
    }
    .save-button:disabled {
      background: #555;
      cursor: not-allowed;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {
  employee = input<Employee | null>(null);
  close = output<void>();
  save = output<Employee>();

  private fb = inject(FormBuilder);
  employeeForm: FormGroup;

  constructor() {
    this.employeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      hireDate: [new Date().toISOString().split('T')[0]]
    });
  }

  ngOnInit() {
    const currentEmployee = this.employee();
    if (currentEmployee) {
      this.employeeForm.patchValue(currentEmployee);
    }
  }
}
