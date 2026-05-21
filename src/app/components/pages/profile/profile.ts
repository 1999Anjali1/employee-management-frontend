import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const newPassword = control.get('newPassword')?.value;
  const confirmNewPassword = control.get('confirmNewPassword')?.value;
  return newPassword === confirmNewPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  passwordError = '';

  profileData = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    joinedDate: 'January 2024'
  };

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      this.profileData = { ...this.profileData, ...JSON.parse(saved) };
    }

    this.profileForm = this.fb.group({
      name: [this.profileData.name, Validators.required],
      email: [this.profileData.email, [Validators.required, Validators.email]],
      password: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  get f() {
    return this.profileForm.controls;
  }

  get pf() {
    return this.passwordForm.controls;
  }

  getInitials(): string {
    return this.profileData.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const { name, email } = this.profileForm.value;
    this.profileData = { ...this.profileData, name, email };
    localStorage.setItem('userProfile', JSON.stringify({ name, email }));
    this.toastService.show('Profile updated successfully!', 'success');
  }

 onResetPassword(): void {
  this.passwordError = '';

  if (this.passwordForm.invalid) {
    this.passwordForm.markAllAsTouched();
    return;
  }

  const { currentPassword, newPassword } = this.passwordForm.value;
  const currentEmail = this.profileData.email;

  this.authService.changePassword(currentEmail, currentPassword, newPassword).subscribe({
    next: () => {
      this.toastService.show('Password changed successfully!', 'success');
      this.passwordForm.reset();
    },
    error: (err) => {
      this.passwordError = err.error?.error || 'Failed to change password';
    }
  });
}

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
    this.router.navigate(['/login']);
  }
}