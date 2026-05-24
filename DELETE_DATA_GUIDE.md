# Delete All Existing Data - Complete Guide

## 🗑️ MySQL Query to Delete ALL Data

Run this in MySQL Workbench to completely clear all existing data:

```sql
USE hrms_db;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Delete all data from all tables
TRUNCATE TABLE attendance;
TRUNCATE TABLE leave_requests;
TRUNCATE TABLE task_assignments;
TRUNCATE TABLE payroll;
TRUNCATE TABLE employees;
TRUNCATE TABLE users;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Verify all tables are empty
SELECT 'users' AS TableName, COUNT(*) as RecordCount FROM users
UNION ALL
SELECT 'employees', COUNT(*) FROM employees
UNION ALL
SELECT 'attendance', COUNT(*) FROM attendance
UNION ALL
SELECT 'leave_requests', COUNT(*) FROM leave_requests
UNION ALL
SELECT 'task_assignments', COUNT(*) FROM task_assignments
UNION ALL
SELECT 'payroll', COUNT(*) FROM payroll;
```

---

## ✅ Expected Output After Deletion

```
TableName          | RecordCount
-------------------|------------
users              | 0
employees          | 0
attendance         | 0
leave_requests     | 0
task_assignments   | 0
payroll            | 0
```

---

## 🔄 Step-by-Step Process to Test New Employee Creation

### **Step 1: Clean Database**
```sql
USE hrms_db;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE attendance;
TRUNCATE TABLE leave_requests;
TRUNCATE TABLE task_assignments;
TRUNCATE TABLE payroll;
TRUNCATE TABLE employees;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;
```

### **Step 2: Verify Database is Empty**
```sql
SELECT COUNT(*) as Total_Records FROM users;
SELECT COUNT(*) as Total_Records FROM employees;
```
Both should show: **0**

### **Step 3: Start Spring Boot Backend**
```bash
cd backend
mvn spring-boot:run
```

### **Step 4: Open Frontend**
- Go to: `http://localhost:8080` (or your configured port)
- Should show empty dashboard / signup page

### **Step 5: Create New User via Signup**
1. Click "Sign Up"
2. Fill in details:
   - **Username**: `testuser`
   - **Email**: `testuser@example.com`
   - **Password**: `TestPass@123`
3. Click "Submit" / "Sign Up"
4. You should see success message

### **Step 6: Check Database for New User**
Run in MySQL:
```sql
SELECT * FROM users;
```
You should see your new user entry!

### **Step 7: Create New Employee via Website**
1. Login with your new account
2. Go to "Employees" section
3. Click "Add New Employee" (or similar)
4. Fill in details:
   - **First Name**: `John`
   - **Last Name**: `Doe`
   - **Email**: `john.doe@example.com`
   - **Phone**: `+91-9876543210`
   - **Department**: `Engineering`
   - **Designation**: `Developer`
   - **Date of Joining**: `2026-05-23`
   - **Salary**: `60000`
5. Click "Save"

### **Step 8: Check Both Locations**

**In MySQL:**
```sql
SELECT * FROM employees WHERE first_name = 'John';
```

**In Website:**
- Navigate to "Employees" page
- You should see "John Doe" in the employee list with all entered details

---

## 🔍 Verification Queries

### **Check if new employee is in database:**
```sql
SELECT id, first_name, last_name, email, department, designation, salary 
FROM employees 
WHERE first_name = 'John';
```

### **Check if new user is in database:**
```sql
SELECT id, username, email, role, is_active 
FROM users 
WHERE username = 'testuser';
```

### **Count total records (should be 1 each):**
```sql
SELECT 'Total Users' as Type, COUNT(*) as Count FROM users
UNION ALL
SELECT 'Total Employees', COUNT(*) FROM employees;
```

### **View all data in clean database:**
```sql
SELECT * FROM users;
SELECT * FROM employees;
SELECT * FROM attendance;
SELECT * FROM leave_requests;
SELECT * FROM task_assignments;
SELECT * FROM payroll;
```

---

## 📊 Data Flow Verification

```
Frontend (Add New Employee)
        ↓
REST API (POST /api/employees)
        ↓
Spring Boot Backend (EmployeeService)
        ↓
JPA Repository (Save to DB)
        ↓
MySQL Database (employees table)
        ↓
Frontend Refresh (GET /api/employees)
        ↓
New Employee Displayed in Table
```

---

## ✨ Testing Checklist

- [ ] Database cleaned (all tables show COUNT = 0)
- [ ] Backend started successfully
- [ ] Frontend loads without sample data
- [ ] Signup works and user created
- [ ] User visible in MySQL `users` table
- [ ] Can login with new user
- [ ] Can add new employee via website
- [ ] Employee visible in MySQL `employees` table
- [ ] Employee visible in website employee list
- [ ] Employee details match between website and database

---

## 🚨 Troubleshooting

**Issue**: Employee created on website but not in database
- **Solution**: Check if API is saving to database. Look at Spring Boot logs for errors.

**Issue**: Employee in database but not showing on website
- **Solution**: Refresh the page or check if frontend API endpoint is correct.

**Issue**: Cannot delete data
- **Solution**: Make sure `SET FOREIGN_KEY_CHECKS = 0;` is run first to temporarily disable constraints.

**Issue**: Foreign key constraint error
- **Solution**: Delete data in correct order (child tables first, then parent tables).

---

## 🎯 Final Result

After following these steps:
- ✅ Database completely clean (no sample data)
- ✅ Only data you create via website is present
- ✅ Can verify new data in both MySQL and website
- ✅ Can test complete data flow from frontend to database

---

Generated: May 23, 2026
