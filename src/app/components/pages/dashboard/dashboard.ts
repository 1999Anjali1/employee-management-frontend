import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Employee, EmployeeService } from '../../../services/employee.sevice';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CurrencyPipe, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  employees: Employee[] = [];
  isLoading = true;

  totalEmployees = 0;
  totalDepartments = 0;
  avgSalary = 0;
  highestSalary = 0;

  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // Bar Chart — Department
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  };

  // Pie Chart — Department Share
  pieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true }
    }
  };

  // Line Chart — Hiring Trend
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  };

  // Doughnut Chart — Salary Distribution
  doughnutChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true }
    }
  };

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees = [...data];
        this.totalEmployees = data.length;
        this.totalDepartments = new Set(data.map(e => e.department)).size;
        const salaries = data.map(e => Number(e.salary));
        this.avgSalary = salaries.reduce((a, b) => a + b, 0) / (salaries.length || 1);
        this.highestSalary = Math.max(...salaries, 0);

        this.buildCharts(data);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  buildCharts(data: Employee[]): void {
    // Department counts
    const deptMap = new Map<string, number>();
    data.forEach(e => deptMap.set(e.department, (deptMap.get(e.department) || 0) + 1));
    const deptLabels = Array.from(deptMap.keys());
    const deptCounts = Array.from(deptMap.values());
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];

    // Bar Chart
    this.barChartData = {
      labels: deptLabels,
      datasets: [{
        data: deptCounts,
        backgroundColor: colors.slice(0, deptLabels.length),
        borderRadius: 6,
        label: 'Employees'
      }]
    };

    // Pie Chart
    this.pieChartData = {
      labels: deptLabels,
      datasets: [{
        data: deptCounts,
        backgroundColor: colors.slice(0, deptLabels.length),
        hoverOffset: 10
      }]
    };

    // Salary Distribution Doughnut
    const salaryRanges = ['< ₹50k', '₹50k-70k', '₹70k-90k', '> ₹90k'];
    const salaryCounts = [
      data.filter(e => Number(e.salary) < 50000).length,
      data.filter(e => Number(e.salary) >= 50000 && Number(e.salary) < 70000).length,
      data.filter(e => Number(e.salary) >= 70000 && Number(e.salary) < 90000).length,
      data.filter(e => Number(e.salary) >= 90000).length
    ];
    this.doughnutChartData = {
      labels: salaryRanges,
      datasets: [{
        data: salaryCounts,
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        hoverOffset: 10
      }]
    };

    // Line Chart — Monthly Hiring
    const monthMap = new Map<string, number>();
    data.forEach(e => {
      if (e.hire_date) {
        const d = new Date(e.hire_date);
        const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
        monthMap.set(key, (monthMap.get(key) || 0) + 1);
      }
    });
    const monthLabels = Array.from(monthMap.keys());
    const monthCounts = Array.from(monthMap.values());

    this.lineChartData = {
      labels: monthLabels,
      datasets: [{
        data: monthCounts,
        label: 'Hires',
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointRadius: 5
      }]
    };
  }

  getProfileInitials(): string {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    return profile.name ? profile.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'AU';
  }

  goToEmployees(): void { this.router.navigate(['/employees']); }
  goToProfile(): void { this.router.navigate(['/profile']); }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}