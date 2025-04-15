import React from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminNavbar from '@/components/layout/AdminNavbar';

const AdminLogs = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="ml-56 w-full">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">System Logs</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogs;
