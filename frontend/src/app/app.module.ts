import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeFormComponent } from './employees/employee-form.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentFormComponent } from './departments/department-form.component';
import { AttendanceComponent } from './attendance/attendance';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    EmployeesComponent,
    DepartmentsComponent,
    AttendanceComponent,
    AppComponent,
    EmployeeFormComponent,
    DepartmentFormComponent,
    LandingPageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
