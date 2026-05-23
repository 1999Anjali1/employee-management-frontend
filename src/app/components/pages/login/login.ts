import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  loadingMessage = 'Sign in';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }
onLogin(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';
  this.loadingMessage = 'Signing in...';

  // Show wake up message after 3 seconds
  setTimeout(() => {
    if (this.isLoading) {
      this.loadingMessage = 'Waking up server, please wait...';
    }
  }, 3000);

  setTimeout(() => {
    if (this.isLoading) {
      this.loadingMessage = 'Almost there...';
    }
  }, 8000);

  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      this.authService.saveSession(res.token, res.user);
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      this.errorMessage = err.error?.error || 'Login failed. Please try again.';
      this.isLoading = false;
      this.loadingMessage = 'Sign in';
    }
  });
}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}