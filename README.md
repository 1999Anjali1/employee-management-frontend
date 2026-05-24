# 🏢 EMS Suite — Employee Management System (Frontend)

![Angular](https://img.shields.io/badge/Angular-21.2.8-red?style=flat&logo=angular)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-blue?style=flat&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat&logo=vercel)

A modern, AI-powered Employee Management System built with **Angular 21**, featuring real-time dashboards, interactive charts, and intelligent HR tools powered by **Groq AI**.

🌐 **Live Demo:** [https://employee-management-frontend-ivory-ten.vercel.app](https://employee-management-frontend-ivory-ten.vercel.app)  
🔙 **Backend Repo:** [employee-management-backend](https://github.com/1999Anjali1/employee-management-backend)

---

## ✨ Features

### Core Features
- 🔐 **JWT Authentication** — Secure login, register, forgot/reset password
- 👥 **Employee CRUD** — Add, edit, delete, and list employees with pagination
- 🔍 **Smart Search** — Real-time search by name or department
- 📊 **Interactive Dashboard** — Bar, Pie, Line, Doughnut charts using Chart.js
- 📱 **Responsive Design** — Mobile-friendly with hamburger sidebar navigation
- 🔔 **Toast Notifications** — Success/error feedback for all actions
- 🗑️ **Delete Modal** — Confirmation modal instead of browser alert

### AI-Powered Features 🤖
- **AI HR Chatbot** — Natural language Q&A about workforce (Groq/LLaMA 3.3)
- **AI Salary Recommendation** — Suggests salary range based on department + position
- **AI Employee Insights** — One-click analysis: summary, tenure, salary rank, strengths
- **AI Resume Parser** — Upload PDF → auto-fills employee form instantly

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Angular (Standalone) | 21.2.8 |
| Styling | Tailwind CSS | 4.3.0 |
| Charts | Chart.js + ng2-charts | Latest |
| Icons | @ng-icons/heroicons | Latest |
| HTTP Client | Angular HttpClient | 21.x |
| Auth | JWT (localStorage) | - |
| Routing | Angular Router (Lazy) | 21.x |
| Deployment | Vercel | - |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Angular CLI v21+

```bash
npm install -g @angular/cli
```

### Installation

```bash
# Clone the repository
git clone https://github.com/1999Anjali1/employee-management-frontend.git
cd employee-management-frontend
npm install
ng serve
```

Open your browser at `http://localhost:4200`

---

## ⚙️ Environment Configuration

**`src/environments/environment.ts`** (Local):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

**`src/environments/environment.prod.ts`** (Production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://employee-management-backend-lms2.onrender.com/api'
};
```

---

## 📁 Project Structure
src/
├── app/
│   ├── components/
│   │   ├── ai-chatbot/          # 🤖 AI HR Chatbot widget
│   │   ├── layout/              # Sidebar + Top Navbar shell
│   │   ├── pages/
│   │   │   ├── employee-list/   # Table with search + pagination
│   │   │   └── employee-form/   # Add/Edit form + AI Resume Parser
│   │   └── toast/               # Toast notification component
│   ├── guards/
│   │   └── auth.guard.ts        # JWT route protection
│   ├── interceptors/
│   │   └── auth.interceptor.ts  # Auto-inject Bearer token
│   ├── pages/
│   │   ├── dashboard/           # Analytics + AI insights
│   │   ├── login/               # Login with split layout
│   │   ├── register/            # New user registration
│   │   ├── profile/             # Edit profile + change password
│   │   ├── forgot-password/     # Request password reset
│   │   └── reset-password/      # Reset via email token
│   └── services/
│       ├── employee.service.ts  # Employee + AI API calls
│       ├── auth.service.ts      # Auth API calls + session
│       └── toast.service.ts     # Global toast notifications
└── environments/
├── environment.ts           # Dev config
└── environment.prod.ts      # Prod config

---

## 🤖 AI Features Details

### 1. HR Chatbot
Floating chat widget powered by Groq LLaMA 3.3 70B:
- *"How many employees do we have?"*
- *"Who joined after 2022?"*
- *"List all Engineering employees"*
- Salary and personal data are **never revealed** (privacy enforced)

### 2. AI Salary Recommendation
- Select Department + enter Position in Add Employee form
- Click **🤖 AI** button next to Salary field
- AI analyzes existing team salaries + market knowledge
- Returns min / recommended / max range
- Auto-fills salary field with recommended value

### 3. AI Employee Insights
- Click **🤖 AI** button on any employee row
- Modal shows: Summary, Salary Analysis, Tenure, Department Rank, Key Strengths, HR Recommendation
- Powered by Groq LLaMA with full team data as context

### 4. AI Resume Parser
- Upload PDF resume in Add Employee form
- AI extracts: name, email, phone, position, department
- Form fields auto-filled instantly
- Shows loading spinner → green checkmark on success

---

## 🏗️ Build for Production

```bash
ng build --configuration production
```

Output: `dist/frontend/browser/`

---

## 📦 Key Dependencies

```json
{
  "@angular/core": "^21.2.0",
  "chart.js": "latest",
  "ng2-charts": "latest",
  "@ng-icons/core": "latest",
  "@ng-icons/heroicons": "latest",
  "tailwindcss": "^4.3.0",
  "flowbite": "^4.0.2"
}
```

---

## 👩‍💻 Author

**Anjali P**
- GitHub: [@1999Anjali1](https://github.com/1999Anjali1)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
