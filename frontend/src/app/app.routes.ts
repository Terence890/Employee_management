import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthLayoutComponent } from './auth/auth-layout.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { authGuard } from './auth/auth.guard';
import { publicGuard } from './auth/public.guard';
import { AttendanceComponent } from './attendance/attendance';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'WorkZen - Dashboard' },
      { path: 'departments', component: DepartmentsComponent, title: 'WorkZen - Departments' },
      { path: 'employees', component: EmployeesComponent, title: 'WorkZen - Employees' },
      { path: 'attendance', component: AttendanceComponent, title: 'WorkZen - Attendance' },
      { path: 'profile', component: ProfileComponent, title: 'WorkZen - Profile' },
      { path: 'settings', component: SettingsComponent, title: 'WorkZen - Settings' },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [publicGuard],
    children: [
      { path: 'signin', component: SigninComponent, title: 'WorkZen - Sign In' },
      { path: 'signup', component: SignupComponent, title: 'WorkZen - Sign Up' }
    ]
  },
  { path: '**', redirectTo: 'signin' }
];
