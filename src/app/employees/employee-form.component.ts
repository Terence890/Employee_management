import { ChangeDetectionStrategy, Component, output, input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from './employees.service';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="employeeForm" (ngSubmit)="onSave()" class="employee-form">
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
  styleUrls: ['./employee-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {
  employee = input<Employee | null>(null);
  close = output<void>();
  save = output<Omit<Employee, 'id'> | Employee>();

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

  onSave() {
    if (this.employeeForm.valid) {
      this.save.emit(this.employeeForm.value);
    }
  }
}
