import { ChangeDetectionStrategy, Component, output, input, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from './employees.service';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
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
      hireDate: [new Date().toISOString().split('T')[0]],
      photoUrl: ['']
    });
  }

  ngOnInit() {
    const currentEmployee = this.employee();
    if (currentEmployee) {
      this.employeeForm.patchValue(currentEmployee);
    }
  }

  get photoUrl(): AbstractControl {
    return this.employeeForm.get('photoUrl') as AbstractControl;
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.employeeForm.patchValue({
          photoUrl: reader.result
        });
      };
    }
  }

  onSave() {
    if (this.employeeForm.valid) {
      this.save.emit(this.employeeForm.value);
    }
  }
}
