import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../attendance.service';
import { Attendance } from '../attendance';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './attendance.html',
  styleUrls: ['./attendance.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceComponent {
  private attendanceService = inject(AttendanceService);
  private formBuilder = inject(FormBuilder);

  public attendance$: Observable<Attendance[]> = this.attendanceService.getAttendance();
  public attendanceForm = this.formBuilder.group({
    employeeId: ['', Validators.required],
    date: ['', Validators.required],
    timeIn: ['', Validators.required],
    timeOut: ['', Validators.required],
    isPresent: [true, Validators.required]
  });

  addAttendance() {
    if (this.attendanceForm.valid) {
      this.attendanceService.addAttendance(this.attendanceForm.value as unknown as Attendance)
        .subscribe(() => {
          this.attendance$ = this.attendanceService.getAttendance();
          this.attendanceForm.reset();
        });
    }
  }
}
