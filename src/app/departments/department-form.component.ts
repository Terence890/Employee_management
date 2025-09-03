import { ChangeDetectionStrategy, Component, output, input, OnInit, inject } from '@angular/core';
import { Department } from './departments.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-department-form',
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-overlay" (click)="close.emit()">
      <div class="form-container" (click)="$event.stopPropagation()">
        <h2>{{ department() ? 'Edit' : 'Add' }} Department</h2>
        <form [formGroup]="departmentForm" (ngSubmit)="onSave()">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" formControlName="name" required>
          </div>
          <div class="form-group">
            <label for="head">Head</label>
            <input type="text" id="head" formControlName="head" required>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" formControlName="description" required></textarea>
          </div>
          <div class="form-actions">
            <button type="button" (click)="close.emit()">Cancel</button>
            <button type="submit" [disabled]="departmentForm.invalid">Save</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./department-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  department = input<Department | null>(null);
  close = output<void>();
  save = output<Omit<Department, 'id'>>();

  departmentForm = this.fb.group({
    name: ['', Validators.required],
    head: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit() {
    const currentDepartment = this.department();
    if (currentDepartment) {
      this.departmentForm.patchValue(currentDepartment);
    }
  }

  onSave() {
    if (this.departmentForm.valid) {
      this.save.emit(this.departmentForm.value as Omit<Department, 'id'>);
    }
  }
}
