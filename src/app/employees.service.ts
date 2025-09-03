import { Injectable, signal } from '@angular/core';

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
  private employees = signal<Employee[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice.j@workzen.com', department: 'Engineering', position: 'Software Engineer', hireDate: '2022-08-15' },
    { id: 2, name: 'Bob Williams', email: 'bob.w@workzen.com', department: 'Marketing', position: 'Marketing Manager', hireDate: '2021-03-10' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.b@workzen.com', department: 'Sales', position: 'Sales Representative', hireDate: '2023-01-20' },
    { id: 4, name: 'Diana Miller', email: 'diana.m@workzen.com', department: 'Human Resources', position: 'HR Specialist', hireDate: '2022-11-05' },
  ]);

  getEmployees() {
    return this.employees;
  }

  addEmployee(employee: Employee) {
    this.employees.update(employees => [...employees, { ...employee, id: Date.now() }]);
  }

  updateEmployee(updatedEmployee: Employee) {
    this.employees.update(employees => 
      employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
    );
  }

  deleteEmployee(id: number) {
    this.employees.update(employees => employees.filter(emp => emp.id !== id));
  }
}
