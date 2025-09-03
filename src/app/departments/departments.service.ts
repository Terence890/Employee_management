import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

export interface Department {
  id: number;
  name: string;
  head: string;
  description: string;
  memberCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private http = inject(HttpClient);
  private departments = signal<Department[]>([]);

  getDepartments() {
    return this.departments;
  }

  loadDepartments() {
    return this.http.get<Department[]>('/api/departments').pipe(
      tap(departments => this.departments.set(departments))
    );
  }

  saveDepartment(department: Department) {
    const save$ = department.id
      ? this.http.put<Department>(`/api/departments/${department.id}`, department)
      : this.http.post<Department>('/api/departments', department);

    return save$.pipe(tap(() => this.loadDepartments().subscribe()));
  }

  deleteDepartment(id: number) {
    return this.http.delete(`/api/departments/${id}`).pipe(
      tap(() => this.loadDepartments().subscribe())
    );
  }
}
