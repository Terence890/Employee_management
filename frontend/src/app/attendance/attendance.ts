import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../attendance.service';
import { Attendance } from '../attendance';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

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

  private refreshTrigger$ = new BehaviorSubject<void>(undefined);
  private readonly attendance$ = this.refreshTrigger$.pipe(
    switchMap(() => this.attendanceService.getAttendance())
  );
  public attendance = toSignal(this.attendance$, { initialValue: [] as Attendance[] });

  public attendanceForm = this.formBuilder.group({
    employeeId: ['', Validators.required],
    date: ['', Validators.required],
    timeIn: ['', Validators.required],
    timeOut: ['', Validators.required],
    present: [true, Validators.required]
  });

  viewMode = signal<'card' | 'list'>('card');
  isFormOpen = signal(false);
  searchTerm = signal('');
  
  filteredAttendance = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const attendance = this.attendance();
    return attendance.filter(item => 
      item.employeeId.toString().toLowerCase().includes(term)
    );
  });

  setViewMode(mode: 'card' | 'list') {
    this.viewMode.set(mode);
  }

  openForm() {
    this.isFormOpen.set(true);
  }

  closeForm() {
    this.isFormOpen.set(false);
  }

  addAttendance() {
    if (this.attendanceForm.valid) {
      this.attendanceService.addAttendance(this.attendanceForm.value as unknown as Attendance)
        .subscribe(() => {
          this.refreshTrigger$.next();
          this.attendanceForm.reset();
          this.closeForm();
        });
    }
  }
}
