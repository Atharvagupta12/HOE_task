# House of EdTech – Fullstack Assignment Project

This project is a full-stack application built as part of the House of EdTech developer assignment.  
The goal was to design a small but meaningful tool that demonstrates real product thinking, secure backend architecture, and a clean, modern UI using Next.js 16.

The application is built for cohort-based learning teams. Mentors and admins can create programs, track progress, and manage cohort information in one place. The focus of the project was not just CRUD operations, but building something that feels structured, scalable, and close to a real EdTech product.

---

## Features

### 🔐 Authentication & Authorization  
- JWT-based login system using HTTP-only cookies  
- Role-based access (Admin & Mentor can create programs, Learners have restricted access)  
- Secure server-side checks using middleware and protected API routes  

### 📚 Program Management  
- Create new programs (Mentor/Admin only)  
- View all existing programs  
- Each program stores title, description, mentor, and dates  
- Clean form validation using Zod  
- Fully connected to MongoDB with proper schema and timestamps  

### ⚡ Modern UI & UX  
- Built using Tailwind CSS  
- Minimal, dark UI inspired by modern EdTech dashboards  
- Responsive design  
- Reusable components (buttons, cards, sections)  
- SSR and server components for performance  

### 🛠️ Tech Stack
- **Next.js 16** (App Router, API Routes, SSR)
- **MongoDB** (Native driver)
- **Tailwind CSS**
- **TypeScript**
- **Zod** for input validation
- **JWT Authentication**

---

## Folder Structure (Important parts)

src/
└─ app/
├─ api/
│ └─ auth/ (login, register, logout)
│ └─ programs/ (program CRUD)
│ └─ checkins/
│
├─ login/
├─ register/
├─ dashboard/
├─ programs/
│ ├─ new/
│ └─ [id]/
│
├─ layout.tsx
└─ page.tsx

---

## How to Run

npm install
npm run dev

Set the following environment variables:

MONGODB_URI=your_database_uri
JWT_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000


---

## Why this project is different from a basic CRUD app

The assignment focuses on showcasing architecture and thinking, not just CRUD.  
This project includes:

- Proper role-based authorization  
- Secure server-only auth handling  
- Validation using Zod schemas  
- A clean dashboard-style UI  
- A structure that can genuinely scale into a real EdTech tool  

It’s intentionally built like a small production system, not a demo.

---

## Credits  

**Built by Atharva Gupta**  
GitHub • LinkedIn
