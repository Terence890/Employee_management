import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';
import { authGuard } from './auth/auth.guard';

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
      { path: 'profile', component: ProfileComponent, title: 'WorkZen - Profile' },
      { path: 'settings', component: SettingsComponent, title: 'WorkZen - Settings' },
    ]
  },
  {
    path: 'signin',
    component: Signin,
    title: 'WorkZen - Sign In'
  },
  {
    path: 'signup',
    component: Signup,
    title: 'WorkZen - Sign Up'
  }
];
