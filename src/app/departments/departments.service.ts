import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
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

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>('/api/departments').pipe(
      tap(departments => this.departments.set(departments))
    );
  }

  saveDepartment(department: Department): Observable<Department> {
    if (department.id) {
      return this.http.put<Department>(`/api/departments/${department.id}`, department).pipe(
        tap(() => this.loadDepartments())
      );
    } else {
      return this.http.post<Department>('/api/departments', department).pipe(
        tap(() => this.loadDepartments())
      );
    }
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`/api/departments/${id}`).pipe(
      tap(() => this.loadDepartments())
    );
  }

  private loadDepartments() {
    this.getDepartments().subscribe();
  }
}
