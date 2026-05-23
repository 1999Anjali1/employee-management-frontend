import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroSquares2x2,
  heroUsers,
  heroUserPlus,
  heroArrowRightOnRectangle,
  heroBell,
  heroChartBar
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, NgIconComponent],
  providers: [provideIcons({
    heroSquares2x2,
    heroUsers,
    heroUserPlus,
    heroArrowRightOnRectangle,
    heroBell,
    heroChartBar
  })],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {
  userName = 'User';
  currentUrl = '';
  currentDate = '';
  isSidebarOpen = false;

  private router = inject(Router);

  ngOnInit(): void {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    this.userName = profile.name || 'User';

    this.currentDate = new Date().toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });

    this.currentUrl = this.router.url;
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.currentUrl = e.url;
    });
  }

  getInitials(): string {
    return this.userName.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  isActive(path: string): boolean {
    return this.currentUrl === path || this.currentUrl.startsWith(path + '/');
  }

 navigate(path: string): void {
  this.router.navigate([path]);
  this.isSidebarOpen = false;
}

  getPageTitle(): string {
    if (this.currentUrl.includes('dashboard')) return 'Dashboard';
    if (this.currentUrl.includes('employees/add')) return 'Add Employee';
    if (this.currentUrl.includes('employees/edit')) return 'Edit Employee';
    if (this.currentUrl.includes('employees')) return 'Employees';
    if (this.currentUrl.includes('profile')) return 'Profile';
    return 'Employee Management';
  }

  getPageSubtitle(): string {
    if (this.currentUrl.includes('dashboard')) return 'Overview of your employee data';
    if (this.currentUrl.includes('employees/add')) return 'Fill in the details to add a new employee';
    if (this.currentUrl.includes('employees/edit')) return 'Update employee information';
    if (this.currentUrl.includes('employees')) return 'Manage all employees';
    if (this.currentUrl.includes('profile')) return 'Manage your account settings';
    return '';
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}