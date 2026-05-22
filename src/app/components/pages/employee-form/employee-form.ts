import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.sevice';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss'
})
export class EmployeeForm implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId!: number;
  departments: string[] = [];
  departmentsLoading = true;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
    private toastService = inject(ToastService);

  ngOnInit(): void {
    this.initForm();
    this.loadDepartments();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployee(this.employeeId);
    }
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required],
      hire_date: ['', Validators.required]
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  loadEmployee(id: number): void {
    this.employeeService.getById(id).subscribe({
      next: (emp) => {
        this.employeeForm.patchValue({
          ...emp,
          hire_date: emp.hire_date ? emp.hire_date.toString().split('T')[0] : ''
        });
      },
      error: (err) => console.error(err)
    });
  }

 onSubmit(): void {
  if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched();
    return;
  }

  if (this.isEditMode) {
    this.employeeService.update(this.employeeId, this.employeeForm.value).subscribe({
      next: () => {
        this.toastService.show('Employee updated successfully!', 'success');
        setTimeout(() => this.router.navigate(['/employees']), 1000);
      },
      error: (err) => {
        this.toastService.show(err.error?.error || 'Update failed!', 'error');
      }
    });
  } else {
    this.employeeService.create(this.employeeForm.value).subscribe({
      next: () => {
        this.toastService.show('Employee added successfully!', 'success');
        setTimeout(() => this.router.navigate(['/employees']), 1000);
      },
      error: (err) => {
        this.toastService.show(err.error?.error || 'Failed to add employee!', 'error');
      }
    });
  }
}

loadDepartments(retryCount = 0): void {
  this.departmentsLoading = true;
  this.employeeService.getDepartments().subscribe({
    next: (data) => {
      if (data && data.length > 0) {
        this.departments = data;
        this.departmentsLoading = false;
      } else if (retryCount < 3) {
        setTimeout(() => this.loadDepartments(retryCount + 1), 2000);
      } else {
        this.departments = ['Engineering', 'HR', 'Finance', 'Marketing', 'Operations'];
        this.departmentsLoading = false;
      }
    },
    error: () => {
      if (retryCount < 3) {
        setTimeout(() => this.loadDepartments(retryCount + 1), 2000);
      } else {
        this.departments = ['Engineering', 'HR', 'Finance', 'Marketing', 'Operations'];
        this.departmentsLoading = false;
      }
    }
  });
}

  goBack(): void {
    this.router.navigate(['/employees']);
  }

}
