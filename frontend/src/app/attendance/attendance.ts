import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../attendance.service';
import { Attendance } from '../attendance';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule],
  templateUrl: './attendance.html',
  styleUrls: ['./attendance.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceComponent {
  private attendanceService = inject(AttendanceService);
  public attendance$: Observable<Attendance[]> = this.attendanceService.getAttendance();
}
