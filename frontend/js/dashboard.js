document.addEventListener('DOMContentLoaded', async () => {
  if (!Layout.init('dashboard')) return;
  renderRoleWelcome();
  await loadEmployeeProfileCard();
  await loadDashboardStats();
});

function renderRoleWelcome() {
  const role = AuthService.getRole();
  const user = AuthService.getUser();
  const el = document.getElementById('welcome-message');
  const hints = {
    ADMIN: 'Full system access — manage employees, roles, and all modules.',
    HR: 'Manage employee records, attendance, leave, and payroll.',
    MANAGER: 'View your team, approve leave, and track attendance.',
    EMPLOYEE: 'View your profile, apply for leave, and check attendance & salary.'
  };
  if (el) {
    el.innerHTML = `Welcome, <strong>${user?.username || 'User'}</strong> 
      <span class="role-badge role-${role.toLowerCase()}">${role}</span><br>
      <small>${hints[role] || ''}</small>`;
  }

  document.querySelectorAll('[data-role]').forEach(node => {
    const roles = node.dataset.role.split(',').map(r => r.trim());
    node.classList.toggle('hidden', !roles.includes(role));
  });
}

async function loadEmployeeProfileCard() {
  if (AuthService.getRole() !== 'EMPLOYEE') return;

  const card = document.getElementById('employee-profile-card');
  const summary = document.getElementById('employee-profile-summary');
  if (!card || !summary) return;

  card.classList.remove('hidden');

  try {
    let empId = AuthService.getEmployeeId();
    if (!empId) empId = await AuthService.refreshEmployeeId();

    if (!empId) {
      summary.innerHTML = '<p class="alert alert-warning">No employee profile linked. Contact HR/Admin to create your employee record with this login.</p>';
      return;
    }

    const res = await ApiService.getMyEmployeeProfile();
    const emp = Utils.extractData(res);
    if (!emp) {
      summary.textContent = 'Profile not found.';
      return;
    }

    summary.innerHTML = `
      <p><strong>${emp.firstName} ${emp.lastName}</strong> · ${emp.employeeCode || 'N/A'}</p>
      <p>${emp.department} · ${emp.designation}</p>
      <p>${emp.email} · ${emp.phone || '-'}</p>
      <p>Status: <span class="badge badge-${(emp.employmentStatus || 'active').toLowerCase()}">${emp.employmentStatus || 'ACTIVE'}</span></p>`;
  } catch (err) {
    summary.innerHTML = `<p class="alert alert-error">${err.message}</p>`;
  }
}

async function loadDashboardStats() {
  Utils.setLoading(true);
  const role = AuthService.getRole();
  let empId = AuthService.getEmployeeId();
  if (role === 'EMPLOYEE' && !empId) empId = await AuthService.refreshEmployeeId();

  try {
    if (role === 'EMPLOYEE') {
      document.getElementById('stat-employees').textContent = empId ? '1' : '0';
    } else if (PERMISSIONS.can('employee.viewAll') || PERMISSIONS.can('employee.viewTeam')) {
      const empRes = await ApiService.getEmployees();
      const employees = Utils.extractData(empRes) || [];
      document.getElementById('stat-employees').textContent = employees.length;
    } else {
      document.getElementById('stat-employees').textContent = '—';
    }

    if (PERMISSIONS.can('leave.viewAll')) {
      const pendingRes = await ApiService.getPendingLeave();
      document.getElementById('stat-pending-leave').textContent =
        (Utils.extractData(pendingRes) || []).length;
    } else if (empId) {
      const leaveRes = await ApiService.getLeaveByEmployee(empId);
      const mine = Utils.extractData(leaveRes) || [];
      document.getElementById('stat-pending-leave').textContent =
        mine.filter(l => l.status === 'PENDING').length;
    } else {
      document.getElementById('stat-pending-leave').textContent = '—';
    }

    if (PERMISSIONS.can('tasks.manage')) {
      const tasksRes = await ApiService.getAllTasks();
      const tasks = Utils.extractData(tasksRes) || [];
      document.getElementById('stat-tasks').textContent =
        tasks.filter(t => t.status !== 'COMPLETED' && t.status !== 'CANCELLED').length;
    } else if (empId) {
      const tasksRes = await ApiService.getTasksByEmployee(empId);
      const tasks = Utils.extractData(tasksRes) || [];
      document.getElementById('stat-tasks').textContent =
        tasks.filter(t => t.status !== 'COMPLETED' && t.status !== 'CANCELLED').length;
    } else {
      document.getElementById('stat-tasks').textContent = '—';
    }

    if (PERMISSIONS.can('payroll.manage')) {
      const payrollRes = await ApiService.getAllPayrolls();
      const payrolls = Utils.extractData(payrollRes) || [];
      document.getElementById('stat-payroll').textContent =
        payrolls.filter(p => p.paymentStatus === 'PENDING').length;
    } else if (PERMISSIONS.can('payroll.viewSelf') && empId) {
      const payrollRes = await ApiService.getPayrollByEmployee(empId);
      document.getElementById('stat-payroll').textContent =
        (Utils.extractData(payrollRes) || []).length;
    } else {
      document.getElementById('stat-payroll').textContent = '—';
    }
  } catch (err) {
    Utils.showAlert(err.message, 'error');
  } finally {
    Utils.setLoading(false);
  }
}
