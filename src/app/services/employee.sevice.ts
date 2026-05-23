import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  hire_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/employees'; // local development
  // private apiUrl = 'https://employee-management-backend-lms2.onrender.com/api/employees'; // production

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  getDepartments(): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/departments`);
}

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getSalarySuggestion(department: string, position: string, employees: Employee[]): Observable<any> {
  return this.http.post(`${this.apiUrl.replace('/employees', '')}/ai/salary-suggestion`, {
    department,
    position,
    employeeData: employees
  });
}
}