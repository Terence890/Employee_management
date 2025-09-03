import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  private readonly apiUrl = '/api/departments';

  constructor() {
    this.http.get<Department[]>(this.apiUrl).subscribe({
      next: (departments) => this.departments.set(departments),
      error: () => this.departments.set([]) // On error, set to empty array to avoid app crash
    });
  }

  getDepartments() {
    return this.departments;
  }

  addDepartment(department: Omit<Department, 'id'>) {
    this.http.post<Department>(this.apiUrl, department).subscribe(newDepartment => {
      this.departments.update(departments => [...departments, newDepartment]);
    });
  }

  updateDepartment(updatedDepartment: Department) {
    this.http.put<Department>(`${this.apiUrl}/${updatedDepartment.id}`, updatedDepartment).subscribe(() => {
      this.departments.update(departments =>
        departments.map(dep => dep.id === updatedDepartment.id ? updatedDepartment : dep)
      );
    });
  }

  deleteDepartment(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.departments.update(departments => departments.filter(dep => dep.id !== id));
    });
  }
}
