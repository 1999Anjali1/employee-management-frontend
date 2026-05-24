🏢 EMS Suite — Employee Management System (Frontend)

A modern, AI-powered Employee Management System built with Angular 21, featuring real-time dashboards, interactive charts, and intelligent HR tools powered by Groq AI.
🌐 Live Demo: https://employee-management-frontend-ivory-ten.vercel.app

✨ Features
Core Features

🔐 JWT Authentication — Secure login, register, forgot/reset password
👥 Employee CRUD — Add, edit, delete, and list employees with pagination
🔍 Smart Search — Search employees by name or department
📊 Interactive Dashboard — Real-time charts (Bar, Pie, Line, Doughnut) using Chart.js
📱 Responsive Design — Mobile-friendly with hamburger sidebar navigation

AI-Powered Features 🤖

AI HR Chatbot — Ask natural language questions about your workforce (powered by Groq/LLaMA)
AI Salary Recommendation — Get AI-suggested salary ranges based on department, position, and existing data
AI Employee Insights — One-click AI analysis of any employee (summary, tenure, salary rank, strengths, recommendations)
AI Resume Parser — Upload a PDF resume and auto-fill the employee form instantly


🛠️ Tech Stack
LayerTechnologyFrameworkAngular 21 (Standalone Components)StylingTailwind CSS v4ChartsChart.js + ng2-chartsIcons@ng-icons/heroiconsHTTPAngular HttpClientAuthJWT (localStorage)RoutingAngular Router (Lazy Loading)DeploymentVercel

🚀 Getting Started
Prerequisites

Node.js v18+
Angular CLI v21+

bashnpm install -g @angular/cli
Installation
bash# Clone the repository
git clone https://github.com/1999Anjali1/employee-management-frontend.git

# Navigate to frontend
cd employee-management-frontend

# Install dependencies
npm install

# Start development server
ng serve
Open your browser at http://localhost:4200

⚙️ Environment Configuration
Create src/environments/environment.ts:
typescriptexport const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
Create src/environments/environment.prod.ts:
typescriptexport const environment = {
  production: true,
  apiUrl: 'https://your-backend.onrender.com/api'
};

📁 Project Structure
src/
├── app/
│   ├── components/
│   │   ├── ai-chatbot/          # AI HR Chatbot widget
│   │   ├── layout/              # Sidebar + Navbar layout
│   │   ├── pages/
│   │   │   ├── employee-list/   # Employee table with pagination
│   │   │   └── employee-form/   # Add/Edit employee form
│   │   └── toast/               # Toast notifications
│   ├── guards/
│   │   └── auth.guard.ts        # Route protection
│   ├── interceptors/
│   │   └── auth.interceptor.ts  # JWT token injection
│   ├── pages/
│   │   ├── dashboard/           # Analytics dashboard
│   │   ├── login/               # Login page
│   │   ├── register/            # Register page
│   │   ├── profile/             # User profile
│   │   ├── forgot-password/     # Forgot password
│   │   └── reset-password/      # Reset password
│   └── services/
│       ├── employee.service.ts  # Employee API calls
│       ├── auth.service.ts      # Auth API calls
│       └── toast.service.ts     # Toast notifications
└── environments/
    ├── environment.ts           # Development config
    └── environment.prod.ts      # Production config

🤖 AI Features Details
1. HR Chatbot
Ask natural language questions:

"How many employees do we have?"
"Who joined after 2022?"
"List all Engineering employees"

2. Salary Recommendation

Select Department + Position
Click 🤖 AI button next to Salary
AI suggests min/max/recommended salary based on existing data

3. Employee Insights

Click 🤖 AI button on any employee row
Get instant AI analysis: summary, salary rank, tenure, strengths, HR recommendations

4. Resume Parser

Upload PDF resume in Add Employee form
AI extracts: name, email, phone, position, department
Form auto-fills instantly


🏗️ Build for Production
bashng build --configuration production
Output will be in dist/frontend/browser/

📦 Key Dependencies
json{
  "@angular/core": "^21.2.0",
  "chart.js": "latest",
  "ng2-charts": "latest",
  "@ng-icons/core": "latest",
  "@ng-icons/heroicons": "latest",
  "tailwindcss": "^4.3.0",
  "flowbite": "^4.0.2"
}

🔗 Related Repositories

🔙 Backend: employee-management-backend


👩‍💻 Author
Anjali P

GitHub: @1999Anjali1


📄 License
This project is open source and available under the MIT License.
