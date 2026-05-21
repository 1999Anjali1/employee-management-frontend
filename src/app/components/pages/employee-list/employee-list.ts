import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee, EmployeeService } from '../../../services/employee.sevice';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss'
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText: string = '';
  isLoading: boolean = false;
  currentPage = 1;
  itemsPerPage = 5;
  showDeleteModal = false;
  deleteTargetId!: number;

  private toastService = inject(ToastService);

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees = [...data];
        this.filteredEmployees = [...data];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.toastService.show('Failed to load employees', 'error');
      }
    });
  }

  get paginatedEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getProfileInitials(): string {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (profile.name) {
      return profile.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    return 'AU';
  }

  onSearch(): void {
    this.filteredEmployees = this.employees.filter(emp =>
      `${emp.first_name} ${emp.last_name} ${emp.department}`
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
    this.currentPage = 1;
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }


  getDepartmentCount(): number {
    return new Set(this.employees.map(e => e.department)).size;
  }
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  deleteEmployee(id: number): void {
    this.deleteTargetId = id;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    this.showDeleteModal = false;
    this.employeeService.delete(this.deleteTargetId).subscribe({
      next: () => {
        this.toastService.show('Employee deleted successfully!', 'success');
        this.loadEmployees();
      },
      error: () => this.toastService.show('Failed to delete employee', 'error')
    });
  }
}