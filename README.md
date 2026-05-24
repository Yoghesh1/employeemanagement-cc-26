# HRMS Full-Stack Application

Human Resource Management System with a **Spring Boot** backend and **vanilla HTML/CSS/JS** frontend.

## Project Structure

```
hrms/
├── backend/                    ← Spring Boot 3.2 (Eclipse / Maven)
│   ├── pom.xml
│   ├── README.md               ← Detailed API & setup guide
│   └── src/
│       └── main/
│           ├── java/com/hrms/
│           └── resources/
│               ├── application.properties
│               └── db_setup.sql
│
└── frontend/                   ← Static UI (VS Code + Live Server)
    ├── index.html
    ├── login.html
    ├── signup.html
    ├── dashboard.html
    ├── employees.html
    ├── attendance.html
    ├── leave.html
    ├── payroll.html
    ├── tasks.html
    ├── reports.html
    ├── css/
    ├── js/
    │   ├── permissions.js   ← RBAC rules
    │   ├── router.js        ← page protection
    │   └── layout.js        ← shared sidebar
    └── assets/
```

## Quick Start

### 1. Backend (Eclipse)

1. Start MySQL and create database `hrms_db` (see `backend/src/main/resources/db_setup.sql`).
2. Update MySQL password in `backend/src/main/resources/application.properties`.
3. In Eclipse: **File → Import → Maven → Existing Maven Projects** → select `backend/` folder.
4. Run `EmployeeManagementApplication.java` as Java Application.
5. API runs at: **http://localhost:8080/api**

### 2. Frontend (VS Code)

1. Open the `frontend/` folder in VS Code.
2. Install **Live Server** extension (optional but recommended).
3. Right-click `login.html` → **Open with Live Server**.
4. Or use any static server pointing to `frontend/`.

### 3. First Use

1. Open **signup.html** and register an **ADMIN** user.
2. Login at **login.html**.
3. Add employees, then use Attendance, Leave, Tasks, and Payroll modules.

## API Base URL

Configured in `frontend/js/config.js`:

```javascript
API_BASE_URL: 'http://localhost:8080/api'
```

## Authentication

- JWT token stored in `localStorage` (`hrms_token`)
- User info stored in `localStorage` (`hrms_user`)
- All secured requests send: `Authorization: Bearer <token>`
- 401 responses redirect to login

## Role-Based Access

| Feature        | ADMIN | HR | MANAGER | EMPLOYEE |
|----------------|-------|----|---------|----------|
| Employees CRUD | ✓     | ✓  | Team view | Own profile |
| Assign roles   | ✓     | —  | —       | —        |
| Attendance     | ✓     | ✓  | Team    | Own      |
| Leave          | ✓     | ✓  | Approve | Apply    |
| Payroll        | ✓     | ✓  | —       | Own salary |
| Tasks          | ✓     | ✓  | ✓       | Update   |
| Reports        | ✓     | ✓  | Team    | —        |

Frontend enforces RBAC via `js/permissions.js` + `js/router.js` (menu, page guard, UI visibility).

## Backend Changes

**No backend code was modified.** Controllers already include `@CrossOrigin(origins = "*")` for browser access from the frontend dev server.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot connect to backend | Ensure Spring Boot is running on port 8080 |
| 401 Unauthorized | Login again; token may have expired (24h default) |
| 403 Forbidden | Your role lacks permission for that action |
| CORS error | Use Live Server; avoid opening HTML via `file://` |

## Documentation

Full Postman-style API reference: `backend/README.md`
