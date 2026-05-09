# 🔐 Secure Authentication System

A complete authentication system built with Node.js, Express, MySQL, JWT, and 2FA.



## 📚 Course
Data Integrity and Authentication

---

## 🛠️ Tech Stack

| Part | Technology |
|------|-----------|
| Backend | Node.js + Express |
| Database | MySQL |
| Password Hashing | bcryptjs |
| Authentication | JWT (JSON Web Token) |
| 2FA | Speakeasy + QR Code |
| Frontend | HTML + Tailwind CSS |

---

## 📁 Project Structure

```
secure-auth-system/
├── server/
│   ├── config/
│   │   └── db.js                  → Database connection
│   ├── middleware/
│   │   ├── auth.js                → JWT verification
│   │   └── role.js                → Role-based access control
│   ├── routes/
│   │   ├── authRoutes.js          → Register / Login / 2FA
│   │   └── protectedRoutes.js     → Protected routes
│   ├── controllers/
│   │   ├── authController.js      → Auth logic
│   │   └── protectedController.js → Pages logic
│   ├── models/
│   │   └── userModel.js           → Database queries
│   └── app.js                     → Main server file
├── public/
│   ├── index.html                 → Login page
│   ├── register.html              → Register page
│   ├── verify2fa.html             → 2FA verification
│   ├── dashboard.html             → Dashboard
│   ├── admin.html                 → Admin page
│   ├── manager.html               → Manager page
│   └── profile.html               → User profile
├── .env                           → Environment variables
└── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/secure-auth-system.git
cd secure-auth-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Database
- Open XAMPP and start MySQL
- Open phpMyAdmin: `http://localhost/phpmyadmin`
- Run this SQL:

```sql
CREATE DATABASE auth_system;
USE auth_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'user') DEFAULT 'user',
    two_fa_secret VARCHAR(255),
    is_2fa_setup BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Setup Environment Variables
Create `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=auth_system
JWT_SECRET=mysupersecretkey123456789
PORT=3000
```

### 5. Run the project
```bash
npm run dev
```

### 6. Open in browser
```
http://localhost:3000
```

---

## 🔄 System Flow

```
1. User registers
        ↓
2. Password is hashed (bcrypt)
        ↓
3. 2FA secret is generated
        ↓
4. QR Code is displayed
        ↓
5. User scans QR with Google Authenticator
        ↓
6. User logs in with email + password
        ↓
7. User enters 6-digit 2FA code
        ↓
8. System verifies both
        ↓
9. JWT Token is generated
        ↓
10. User accesses routes using token
        ↓
11. Access is controlled based on role
```

---

## 👑 Roles & Permissions

| Role | /admin | /manager | /profile |
|------|--------|----------|---------|
| Admin | ✅ | ✅ | ✅ |
| Manager | ❌ | ✅ | ✅ |
| User | ❌ | ❌ | ✅ |

---

## 🔐 Security Features

- ✅ Password Hashing with bcrypt (salt rounds: 12)
- ✅ Two-Factor Authentication (TOTP)
- ✅ JWT Token Authentication (expires in 24h)
- ✅ Role-Based Access Control (RBAC)
- ✅ Protected API Routes
- ✅ Environment Variables for secrets

---

## 📱 Pages

| Page | URL | Access |
|------|-----|--------|
| Login | `/` | Public |
| Register | `/register.html` | Public |
| 2FA Verify | `/verify2fa.html` | After login |
| Dashboard | `/dashboard.html` | All roles |
| Admin | `/admin.html` | Admin only |
| Manager | `/manager.html` | Manager + Admin |
| Profile | `/profile.html` | All roles |

---

## 🧪 Demo Steps

1. Register a new user
2. Show hashed password in DB
3. Show QR Code for 2FA
4. Login with password + 2FA code
5. Show generated JWT Token
6. Access protected routes
7. Show different roles (Admin / Manager / User)
8. Show blocked access (403 Forbidden)
9. Show GitHub repository with commits

---

## 📡 API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login with email & password | Public |
| POST | `/api/auth/verify-2fa` | Verify 2FA code & get token | Public |
| GET | `/api/dashboard` | Get dashboard data | All roles |
| GET | `/api/admin` | Get admin data | Admin only |
| GET | `/api/manager` | Get manager data | Manager + Admin |
| GET | `/api/profile` | Get profile data | All roles |
