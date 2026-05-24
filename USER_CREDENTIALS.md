# HRMS Sample Data - User Setup Instructions

## 📝 Status: Users Will Be Created via Signup

All pre-configured users have been **removed from sample_data.sql**. You can now create your own users through the application signup process.

---

## 🚀 How to Create Users

1. **Start your Spring Boot backend**:
   ```bash
   mvn spring-boot:run
   ```

2. **Access the Frontend**:
   - Open: `http://localhost:8080` (or your configured port)
   - Click on **"Sign Up"** link

3. **Create Your First User** (Recommended: ADMIN):
   - Choose a username (e.g., `admin`, `yourname`)
   - Enter email (e.g., `admin@hrms.com`)
   - Create a password
   - The role assignment may be handled by:
     - Backend automatically assigning EMPLOYEE role, OR
     - An admin panel where existing admins can change roles

4. **Create Additional Users**:
   - Create HR manager, project managers, and employees as needed
   - Follow the same signup process

---

## 📋 Recommended User Structure to Create

For testing all features, here are **dummy credentials** you can use when signing up:

| Role | Username | Email | Password | Designation |
|------|----------|-------|----------|-------------|
| ADMIN | admin | admin@hrms.com | admin@123 | System Administrator |
| HR | hrmanager | hr@hrms.com | hr@123456 | HR Manager |
| MANAGER | rajesh_kumar | rajesh.kumar@techcorp.com | rajesh@123 | Senior Manager - Engineering |
| MANAGER | neha_desai | neha.desai@techcorp.com | neha@123 | HR Manager |
| EMPLOYEE | priya_sharma | priya.sharma@techcorp.com | priya@123 | Senior Developer |
| EMPLOYEE | amit_patel | amit.patel@techcorp.com | amit@123 | Developer |
| EMPLOYEE | vikram_singh | vikram.singh@techcorp.com | vikram@123 | Sales Manager |
| EMPLOYEE | anjali_gupta | anjali.gupta@techcorp.com | anjali@123 | Sales Executive |

---

## 🔑 Dummy Credentials Quick Reference

Use these credentials when creating test accounts via signup:

```
Admin Account:
  Username: admin
  Password: admin@123
  Email: admin@hrms.com
  Designation: System Administrator

HR Account:
  Username: hrmanager
  Password: hr@123456
  Email: hr@hrms.com
  Designation: HR Manager

Manager 1 (Engineering):
  Username: rajesh_kumar
  Password: rajesh@123
  Email: rajesh.kumar@techcorp.com
  Designation: Senior Manager - Engineering

Manager 2 (HR):
  Username: neha_desai
  Password: neha@123
  Email: neha.desai@techcorp.com
  Designation: HR Manager

Employee 1:
  Username: priya_sharma
  Password: priya@123
  Email: priya.sharma@techcorp.com
  Designation: Senior Developer

Employee 2:
  Username: amit_patel
  Password: amit@123
  Email: amit.patel@techcorp.com
  Designation: Developer

Employee 3:
  Username: vikram_singh
  Password: vikram@123
  Email: vikram.singh@techcorp.com
  Designation: Sales Manager

Employee 4:
  Username: anjali_gupta
  Password: anjali@123
  Email: anjali.gupta@techcorp.com
  Designation: Sales Executive
```

---

## ⚙️ Note on Role Assignment

Check your backend code for how roles are assigned during signup:

**Option 1**: Auto-assign EMPLOYEE role to all new signups
```java
// In AuthService or SignupController
user.setRole(Role.EMPLOYEE); // Default role
```

**Option 2**: Allow role selection during signup
```java
// Modify SignupRequest DTO to include role field
private Role role;
```

**Option 3**: Admin panel for role management
- Create users as EMPLOYEE
- Use admin panel to upgrade roles after creation

---

## 🔄 If You Need Pre-configured Test Users

If you want to restore the pre-configured users, uncomment the INSERT statements in `sample_data.sql`:

1. Open: `backend/src/main/resources/sample_data.sql`
2. Find the section: "-- 1. INSERT USERS - COMMENTED OUT"
3. Uncomment the INSERT IGNORE statements
4. Re-run the SQL file in MySQL

---

## ✅ Sample Data Still Available

All other sample data (employees, attendance, tasks, leave, payroll) is still being generated:
- ✓ 8 employees with departments and salaries
- ✓ 40 attendance records
- ✓ 10 leave requests
- ✓ 20 tasks
- ✓ 8 payroll records

Users table is **empty** - ready for you to create!

---

Generated: May 23, 2026
