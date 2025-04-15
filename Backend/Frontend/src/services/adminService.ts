
import api from './api';

// Get admin dashboard stats
export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

// Get recent activity
export const getRecentActivity = async () => {
  const response = await api.get('/admin/activity');
  return response.data;
};

// Get all users (admin only)
export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

// Update user role (admin only)
export const updateUserRole = async (userId: string, role: string) => {
  const response = await api.put(`/admin/users/${userId}/role`, { role });
  return response.data;
};

// Bulk approve profiles (admin only)
export const bulkApproveProfiles = async (profileIds: string[]) => {
  const response = await api.post('/admin/profiles/approve', { profileIds });
  return response.data;
};

// Generate system report (admin only)
export const getSystemReport = async () => {
  const response = await api.get('/admin/reports/system');
  return response.data;
};

// Get admin user metrics
export const getUserMetrics = async () => {
  const response = await api.get('/admin/metrics/users');
  return response.data;
};

// Disable/Enable user account (admin only)
export const toggleUserStatus = async (userId: string, isActive: boolean) => {
  const response = await api.put(`/admin/users/${userId}/status`, { isActive });
  return response.data;
};

// Get user activity logs (admin only)
export const getUserActivityLogs = async (userId: string) => {
  const response = await api.get(`/admin/users/${userId}/logs`);
  return response.data;
};

// Create admin audit log
export const createAuditLog = async (action: string, details: any) => {
  const response = await api.post('/admin/audit-logs', { action, details });
  return response.data;
};

// Get admin audit logs (paginated)
export const getAuditLogs = async (page = 1, limit = 20) => {
  const response = await api.get(`/admin/audit-logs?page=${page}&limit=${limit}`);
  return response.data;
};

// Perform system backup (admin only)
export const performSystemBackup = async () => {
  const response = await api.post('/admin/system/backup');
  return response.data;
};
