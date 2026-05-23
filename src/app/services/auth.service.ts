import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // local development
// private apiUrl = 'https://employee-management-backend-lms2.onrender.com/api/auth';// production

  constructor(private http: HttpClient) {}

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }

  changePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, { email, currentPassword, newPassword });
  }

  saveSession(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userProfile', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('userProfile') || '{}');
  }
}