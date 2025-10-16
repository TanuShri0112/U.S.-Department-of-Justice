import React from 'react';
import { StudentDashboard } from '@/components/homepage/StudentDashboard';
import { AdminPortal } from '@/components/admin/AdminPortal';
import { useAdminPortal } from '@/contexts/AdminPortalContext';

const Dashboard = () => {
  const { isAdminPortalEnabled, closeAdminPortal } = useAdminPortal();

  // When admin portal is enabled, render it as a full-screen overlay
  if (isAdminPortalEnabled) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <AdminPortal onToggle={closeAdminPortal} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <StudentDashboard />
    </div>
  );
};

export default Dashboard;