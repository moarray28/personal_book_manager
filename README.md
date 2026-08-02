# 📚 Personal Book Manager

A full-stack Personal Book Manager built using **Next.js 16**, **TypeScript**, **MongoDB**, and **JWT Authentication**.

The application allows users to securely manage their personal book collection by adding, editing, deleting, and tracking reading progress.

---

# Features

### Authentication

- User Signup
- User Login
- JWT Authentication
- Secure HTTP-only Cookies
- Protected Dashboard
- Logout

---

### Book Management

- Create Book
- View Books
- Update Book
- Delete Book
- Search Books
- Filter by Reading Status

---

### Reading Status

- Want To Read
- Reading
- Completed

---

### Dashboard

- Total Books
- Reading Count
- Completed Count
- Want To Read Count

---

# Tech Stack

## Frontend

- Next.js 16 (App Router)
- React
- TypeScript
- CSS
- Fetch API

## Backend

- Next.js Route Handlers
- MongoDB
- Mongoose

## Authentication

- JWT
- HTTP Only Cookies

---

# Folder Structure

```
src
│
├── app
│   ├── api
│   │   ├── auth
│   │   └── books
│   │
│   ├── dashboard
│   ├── login
│   ├── signup
│   └── page.tsx
│
├── components
│   ├── books
│   ├── dashboard
│   ├── layout
│   └── ui
│
├── lib
│
├── models
│
├── services
│
├── hooks
│
├── types
│
└── middleware.ts
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------|
| POST | /api/auth/signup |
| POST | /api/auth/login |
| POST | /api/auth/logout |
| GET | /api/auth/me |

---

## Books

| Method | Endpoint |
|----------|----------------|
| GET | /api/books |
| POST | /api/books |
| PATCH | /api/books/:id |
| DELETE | /api/books/:id |

---

# Environment Variables

Create a `.env.local` file in the project root.

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Example

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/personal_book_manager

JWT_SECRET=my_super_secret_key
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/your-username/personal-book-manager.git
```

Go inside the project

```bash
cd personal-book-manager
```

Install dependencies

```bash
npm install
```

Create

```
.env.local
```

Run development server

```bash
npm run dev
```

Application runs at

```
http://localhost:3000
```

---

# Production Build

```bash
npm run build
```

Start

```bash
npm start
```

---

# Authentication Flow

```
Signup
      │
      ▼
Password Hashing
      │
      ▼
User Stored
      │
      ▼
JWT Generated
      │
      ▼
Cookie Stored
      │
      ▼
Dashboard Access
```

---

# Book Flow

```
Login
    │
    ▼
Dashboard
    │
    ▼
Create Book
    │
    ▼
MongoDB
    │
    ▼
Fetch Books
    │
    ▼
Update/Delete
```

---

# Security

- Password hashing using bcrypt
- JWT Authentication
- HTTP Only Cookies
- Protected API Routes
- Protected Dashboard
- Input Validation
- Server-side Authentication

---

# Future Improvements

- Pagination
- Book Cover Upload
- Dark Mode
- Favorites
- Reading Progress
- Categories
- Notes
- Sorting
- User Profile
- Email Verification
- Password Reset

---

# Author

**Ritesh More**

Software Engineer

GitHub:
https://github.com/moarray28
