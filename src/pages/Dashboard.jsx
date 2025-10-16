import React, { useState } from 'react';
import { StudentDashboard } from '@/components/homepage/StudentDashboard';
import { AdminPortal } from '@/components/admin/AdminPortal';
import { Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Dashboard = () => {
  const [isAdminPortalEnabled, setIsAdminPortalEnabled] = useState(false);

  // When admin portal is enabled, render it as a full-screen overlay
  if (isAdminPortalEnabled) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <AdminPortal onToggle={() => setIsAdminPortalEnabled(false)} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Admin Portal Toggle */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Admin Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Enable Admin Portal</span>
            <Switch
              checked={isAdminPortalEnabled}
              onCheckedChange={setIsAdminPortalEnabled}
            />
          </div>
        </div>
      </div>
      
      <StudentDashboard />
    </div>
  );
};

export default Dashboard;