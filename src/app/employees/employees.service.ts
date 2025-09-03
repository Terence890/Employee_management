import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private http = inject(HttpClient);
  private employees = signal<Employee[]>([]);

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/api/employees').pipe(
      tap(employees => this.employees.set(employees))
    );
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    if (employee.id) {
      return this.http.put<Employee>(`/api/employees/${employee.id}`, employee).pipe(
        tap(() => this.loadEmployees())
      );
    } else {
      return this.http.post<Employee>('/api/employees', employee).pipe(
        tap(() => this.loadEmployees())
      );
    }
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`/api/employees/${id}`).pipe(
      tap(() => this.loadEmployees())
    );
  }

  private loadEmployees() {
    this.getEmployees().subscribe();
  }
}
