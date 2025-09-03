import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  hireDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private http = inject(HttpClient);
  private employees = signal<Employee[]>([]);
  private readonly apiUrl = '/api/employees';

  constructor() {
    this.http.get<Employee[]>(this.apiUrl).subscribe({
      next: (employees) => this.employees.set(employees),
      error: () => this.employees.set([]) // On error, set to empty array to avoid app crash
    });
  }

  getEmployees() {
    return this.employees;
  }

  addEmployee(employee: Omit<Employee, 'id'>) {
    this.http.post<Employee>(this.apiUrl, employee).subscribe(newEmployee => {
      this.employees.update(employees => [...employees, newEmployee]);
    });
  }

  updateEmployee(updatedEmployee: Employee) {
    this.http.put<Employee>(`${this.apiUrl}/${updatedEmployee.id}`, updatedEmployee).subscribe(() => {
      this.employees.update(employees =>
        employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
      );
    });
  }

  deleteEmployee(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.employees.update(employees => employees.filter(emp => emp.id !== id));
    });
  }
}
