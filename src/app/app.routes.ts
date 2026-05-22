import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/pages/register/register').then(m => m.Register)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./components/pages/forgot-password/forgot-password').then(m => m.ForgotPassword)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./components/pages/reset-password/reset-password').then(m => m.ResetPassword)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./components/pages/layout/layout').then(m => m.Layout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/pages/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'employees',
        loadComponent: () => import('./components/pages/employee-list/employee-list').then(m => m.EmployeeList)
      },
      {
        path: 'employees/add',
        loadComponent: () => import('./components/pages/employee-form/employee-form').then(m => m.EmployeeForm)
      },
      {
        path: 'employees/edit/:id',
        loadComponent: () => import('./components/pages/employee-form/employee-form').then(m => m.EmployeeForm)
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/pages/profile/profile').then(m => m.Profile)
      }
    ]
  }
];