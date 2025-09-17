import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employees/employee-list.component';
import { EmployeeFormComponent } from './employees/employee-form.component';
import { DepartmentListComponent } from './departments/department-list.component';
import { DepartmentFormComponent } from './departments/department-form.component';
import { AttendanceListComponent } from './attendance/attendance-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    DepartmentListComponent,
    DepartmentFormComponent,
    AttendanceListComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
